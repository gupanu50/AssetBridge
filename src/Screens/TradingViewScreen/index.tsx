import { Platform, View } from 'react-native'
import React, { useMemo } from 'react'
import WebView from 'react-native-webview'
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { NEW_BASE_URL_1 } from '../../Utils/helper';
type Props = MainStackScreenProps<'TradingView'>;
const TradingViewScreen = ({ route }: Props) => {
    const tvBaseUrl = `${NEW_BASE_URL_1}/tv`;
    const symbol = route?.params?.symbol.replace(' ', '') ?? "NIFTY50";
    const interval = "1D";
    const lang = "en";
    const uri = useMemo(() => {
        const qs =
            `dataUrl=${encodeURIComponent(tvBaseUrl)}` +
            `&symbol=${encodeURIComponent(symbol)}` +
            `&interval=${encodeURIComponent(interval)}` +
            `&lang=${encodeURIComponent(lang)}`;

        // Android loads from android_asset, iOS loads from bundle
        return Platform.OS === "android"
            ? `file:///android_asset/tv/mobile_black.html?${qs}`
            : `file:///bundle/tv/mobile_black.html?${qs}`;
    }, [tvBaseUrl, symbol, interval, lang]);
    return (
        <View style={styles.mainView}>
            <WebView
                source={{ uri }}
                originWhitelist={["*"]}
                javaScriptEnabled
                domStorageEnabled
                allowFileAccess
                allowUniversalAccessFromFileURLs
                mixedContentMode="always"
                overScrollMode="never"
                androidLayerType="hardware"
            />
        </View>
    )
}

export default TradingViewScreen