import { useEffect, useRef, useState } from "react";
import { ContractsObj, SearchItem } from "./commonTypes";
import { Platform } from "react-native";
import ReactNativeBlobUtil from 'react-native-blob-util'
import XLSX from 'xlsx';
// import { writeFile, ExternalDirectoryPath, DocumentDirectoryPath } from 'react-native-fs';
// import { PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions';
// import { Alert, PermissionsAndroid, Platform } from "react-native";
// import usePermission from "./usePermissions";

export function useDebounce<T>(value: T, delayMs = 300): T {
    const [debounced, setDebounced] = useState<T>(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delayMs);
        return () => clearTimeout(id);
    }, [value, delayMs]);
    return debounced;
}

function safeStr(v: any) {
    return String(v ?? "").trim();
}

export function buildSearchIndex(contractsObj?: ContractsObj | null): SearchItem[] {
    if (!contractsObj || typeof contractsObj !== "object") return [];

    const out: SearchItem[] = [];

    // ✅ only these exchanges
    const allowedKeys: (keyof ContractsObj)[] = ["BSE", "NSE"];

    for (const key of allowedKeys) {
        const rows = (contractsObj as any)?.[key];
        // console.log('Rows for key', key, rows);
        if (!Array.isArray(rows)) continue;

        for (const row of rows) {
            if (!Array.isArray(row) || row.length < 10) continue;

            const symbol = safeStr(row[2]);
            const fullName = safeStr(row[3]);
            const segment = safeStr(row[9]) || String(key); // fallback

            if (!symbol || !fullName || !segment) continue;

            out.push({
                symbol,
                fullName,
                fullNameLower: fullName.toLowerCase(),
                segment,
            });
        }
    }

    return out;
}
export function searchItems(items: SearchItem[], q: string, limit = 30): SearchItem[] {
    const query = q.trim().toLowerCase();
    if (!query) return [];

    const matches = items.filter((it) => it.fullNameLower.includes(query));

    // prefer startsWith
    matches.sort((a, b) => {
        const aStarts = a.fullNameLower.startsWith(query) ? 0 : 1;
        const bStarts = b.fullNameLower.startsWith(query) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        return a.fullName.length - b.fullName.length;
    });

    return matches.slice(0, limit);
}

export async function downloadExcelToDownloads(data: any[], name: string): Promise<string> {
    const fileName = `${name}_${Date.now()}.xlsx`;
    const mimeType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    // 1) Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, name);

    // 2) Generate base64
    const b64 = XLSX.write(wb, { bookType: "xlsx", type: "base64" });

    const { fs, MediaCollection } = ReactNativeBlobUtil;
    const tempPath = `${fs.dirs.CacheDir}/${fileName}`;

    // 3) Write temp file (app storage)
    await fs.writeFile(tempPath, b64, "base64");

    if (Platform.OS === "android") {
        // 4) Copy to public Downloads using MediaStore
        await MediaCollection.copyToMediaStore(
            {
                name: fileName,
                parentFolder: "AssetBridge", // creates Downloads/AssetBridge/ (optional)
                mimeType,
            },
            "Download",
            tempPath
        );

        // 5) Optional: delete temp file (Downloads copy stays)
        await fs.unlink(tempPath);

        return `Saved to Downloads/${"AssetBridge"}/${fileName}`;
    }

    // iOS: you'd typically keep in Documents or share sheet
    return tempPath;
}

export const formatAmount = (amount: string | number) => {
    const num = Number(amount);
    if (isNaN(num)) return amount;
    return new Intl.NumberFormat('en-IN').format(num);
};

export function capitalizeFirstLetter(string: string) {
    if (!string) {
        return ""; // Handle empty strings safely
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getInitials = (name?: string) => {
    const n = (name || '').trim();
    if (!n) return '?';

    const parts = n.split(/\s+/).filter(Boolean);

    // If multiple words => first char of first + first char of last
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    // Single word => first 2 chars
    const word = parts[0];
    return word.slice(0, 2).toUpperCase();
};