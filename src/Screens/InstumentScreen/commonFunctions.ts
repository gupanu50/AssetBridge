function pad2(n: number) {
    return n < 10 ? `0${n}` : `${n}`;
}

function toIST(d: Date) {
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    return new Date(utc + 330 * 60000); // IST
}

function formatISTDate(d: Date) {
    const ist = toIST(d);
    return `${ist.getFullYear()}-${pad2(ist.getMonth() + 1)}-${pad2(ist.getDate())}`;
}

function isWeekdayIST(d: Date) {
    const ist = toIST(d);
    const day = ist.getDay(); // 0 Sun .. 6 Sat
    return day !== 0 && day !== 6;
}

// last N trading days (Mon–Fri), newest first
function getLastNTradingDatesIST(n: number) {
    const out: string[] = [];
    const cur = new Date();
    while (out.length < n) {
        cur.setDate(cur.getDate() - 1);
        if (isWeekdayIST(cur)) out.push(formatISTDate(cur));
    }
    return out; // [latest, older...]
}

function subtractMonthsIST(base: Date, months: number) {
    const d = toIST(base);
    const x = new Date(d);
    x.setMonth(x.getMonth() - months);
    return x;
}

function subtractYearsIST(base: Date, years: number) {
    const d = toIST(base);
    const x = new Date(d);
    x.setFullYear(x.getFullYear() - years);
    return x;
}

function snapToPrevWeekdayIST(dateIST: Date) {
    const d = new Date(dateIST);
    while (true) {
        const day = d.getDay();
        if (day !== 0 && day !== 6) return d;
        d.setDate(d.getDate() - 1);
    }
}

/**
 * If backend expects UTC with "Z":
 * IST 09:15 => 03:45Z
 * IST 15:30 => 10:00Z
 */
function toUTCZFromISTDay(dayYYYYMMDD: string, hh: string, mm: string) {
    return `${dayYYYYMMDD}T${hh}:${mm}:00Z`;
}

export function buildFromToISO(label: string) {
    // ---- 1D: last 2 trading days
    if (label === "1D") {
        const [toDay, fromDay] = getLastNTradingDatesIST(2);
        return {
            fromDate: toUTCZFromISTDay(fromDay, "03", "45"), // 09:15 IST
            toDate: toUTCZFromISTDay(toDay, "10", "00"),     // 15:30 IST
        };
    }

    // ---- 1W: last 5 trading days (Mon–Fri)
    if (label === "1W") {
        const days = getLastNTradingDatesIST(5); // [latest, ...older]
        const toDay = days[0];
        const fromDay = days[4];
        return {
            fromDate: toUTCZFromISTDay(fromDay, "03", "45"),
            toDate: toUTCZFromISTDay(toDay, "10", "00"),
        };
    }

    // ---- Others: months/years/all
    const [toDay] = getLastNTradingDatesIST(1);
    const endIST = snapToPrevWeekdayIST(toIST(new Date()));

    let startIST: Date;
    switch (label) {
        case "1M": startIST = subtractMonthsIST(endIST, 1); break;
        case "2M": startIST = subtractMonthsIST(endIST, 2); break;
        case "3M": startIST = subtractMonthsIST(endIST, 3); break;
        case "6M": startIST = subtractMonthsIST(endIST, 6); break;
        case "1Y": startIST = subtractYearsIST(endIST, 1); break;
        case "5Y": startIST = subtractYearsIST(endIST, 5); break;
        case "10Y": startIST = subtractYearsIST(endIST, 10); break;
        case "All":
        default:
            startIST = subtractYearsIST(endIST, 20); // choose your All window
            break;
    }

    startIST = snapToPrevWeekdayIST(startIST);
    const fromDay = formatISTDate(startIST);

    return {
        fromDate: toUTCZFromISTDay(fromDay, "03", "45"),
        toDate: toUTCZFromISTDay(toDay, "10", "00"),
    };
}
