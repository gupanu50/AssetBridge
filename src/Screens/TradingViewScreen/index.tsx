import { Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { styles } from './styles';

const TradingViewScreen = () => {
    const uri = "file:///android_asset/tv/mobile_black.html"; // iOS: from main bundle
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