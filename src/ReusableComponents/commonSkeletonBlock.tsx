import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
    width: number | string;
    height: number;
    radius?: number;
    style?: ViewStyle;
};

export default function SkeletonBlock({
    width,
    height,
    radius = 8,
    style,
}: Props) {
    const translateX = useRef(new Animated.Value(-160)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.timing(translateX, {
                toValue: 260,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );

        loop.start();

        return () => {
            loop.stop();
        };
    }, [translateX]);

    return (
        <View
            style={[
                styles.container,
                // @ts-ignore
                {
                    width,
                    height,
                    borderRadius: radius,
                },
                style,
            ]}
        >
            <Animated.View
                style={[
                    styles.shimmerWrap,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            >
                <LinearGradient
                    colors={[
                        'rgba(255,255,255,0.02)',
                        'rgba(255,255,255,0.10)',
                        'rgba(255,255,255,0.02)',
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.shimmer}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    shimmerWrap: {
        ...StyleSheet.absoluteFillObject,
        width: '45%',
    },
    shimmer: {
        flex: 1,
    },
});