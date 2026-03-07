import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import IconButton from '../../ReusableComponents/iconButton';
import { mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import { styles } from './styles';
import { OverViewProps } from './types';

const MarketPlaceOverviewComponent = (props: OverViewProps) => {
    const [aboutExpanded, setAboutExpanded] = useState(true);
    const [disclaimerExpanded, setDisclaimerExpanded] = useState(true);
    const aboutBullets = useMemo(() => {
        const rawDescription = props?.cardData?.description || '';

        return rawDescription
            .split('|')
            .map((item: string) => item.replace(/\r?\n/g, '').trim())
            .filter(Boolean);
    }, [props?.cardData?.description]);

    const disclaimerBullets = useMemo(
        () => [
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type",
            'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
            'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        ],
        [],
    );

    const renderBulletList = (items: string[], expanded: boolean) => {
        const list = expanded ? items : items.slice(0, 2);
        return (
            <View style={{ marginTop: scaler(10) }}>
                {list.map((t, idx) => (
                    <View key={`${idx}`} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>{'\u2022'}</Text>
                        <Text style={styles.bulletText}>{t}</Text>
                    </View>
                ))}
            </View>
        );
    };

    const renderViewLessMore = (
        expanded: boolean,
        onPress: () => void,
        labelExpanded = 'View Less',
        labelCollapsed = 'View More',
    ) => {
        return (
            <View style={styles.viewMoreRow}>
                <Text onPress={onPress} style={styles.viewMoreText}>
                    {expanded ? labelExpanded : labelCollapsed}
                </Text>

                <View style={styles.viewMoreIconWrap}>
                    <IconButton
                        vectorType="MaterialCommunityIcons"
                        name={expanded ? 'chevron-up' : 'chevron-down'}
                        color={mainColors.mainButton}
                        backgroundColor={mainColors.black}
                        onPress={onPress}
                    />
                </View>
            </View>
        );
    };
    return (
        <View>
            {/* Summary Card */}
            <View style={styles.summaryCard}>
                {/* Row 1 */}
                <View style={styles.summaryRow}>
                    <View style={styles.summaryCol}>
                        <Text style={styles.summaryLabel}>Overall PnL</Text>
                        <Text
                            style={[styles.summaryValue, { color: mainColors.green }]}
                        >
                            ₹ {props?.cardData?.backtest_results?.summary?.net_pnl}
                        </Text>
                    </View>

                    {/* <View style={styles.summaryCol}>
                        <Text style={styles.summaryLabel}>Overall PnL</Text>
                        <Text
                            style={[styles.summaryValue, { color: mainColors.red }]}
                        >
                            ₹ -32,000
                        </Text>
                    </View> */}
                </View>

                {/* Win/Loss bar */}
                <View style={styles.winLossRow}>
                    <View style={styles.summaryWinLossCol}>
                        <Text style={styles.summaryWinLossLabel}>Win</Text>
                        <Text style={styles.summarySmallValue}>₹ 1,00,000</Text>
                    </View>

                    <View style={styles.summaryWinLossCol}>
                        <Text style={styles.summaryWinLossLabel}>Loss</Text>
                        <Text style={styles.summarySmallValue}>{(100 % -(props?.cardData?.backtest_results?.summary?.win_rate))}%</Text>
                    </View>
                </View>

                <View style={styles.progressTrack}>
                    <View style={styles.progressFill} />
                </View>

                <View style={styles.summaryDivider} />

                {/* Row 2 */}
                <View style={styles.summaryRow}>
                    <View style={styles.summaryCol}>
                        <Text style={styles.summaryLabel}>Total Trades</Text>
                        <Text style={styles.summaryValuePlain}>{props?.cardData?.backtest_results?.summary?.total_trades}</Text>
                    </View>

                    <View style={styles.summaryCol}>
                        <Text style={styles.summaryLabel}>Average PnL / Trade</Text>
                        <Text style={styles.summaryValuePlain}>₹ {props?.cardData?.backtest_results?.summary?.avg_pnl_trade}</Text>
                    </View>
                </View>

                <View style={styles.summaryDivider} />

                {/* Row 3 */}
                <View style={styles.summaryRow}>
                    <View style={styles.summaryCol}>
                        <Text style={styles.summaryLabel}>
                            Reward to Risk Ratio
                        </Text>
                        <Text style={styles.summaryValuePlain}>{props?.cardData?.backtest_results?.summary?.rr_ratio}</Text>
                    </View>

                    <View style={styles.summaryCol}>
                        <Text style={styles.summaryLabel}>Expectancy Ratio</Text>
                        <Text style={styles.summaryValuePlain}>{props?.cardData?.backtest_results?.summary?.expectancy_ratio}</Text>
                    </View>
                </View>

                <View style={styles.summaryDivider} />

                {/* Row 4 */}
                <View style={styles.summaryRow}>
                    <View style={styles.summaryCol}>
                        <Text style={[styles.summaryLabel, { color: mainColors.headingTextColor }]}>Maximum Profit</Text>
                        <Text
                            style={[styles.summaryValue, { color: mainColors.greenText }]}
                        >
                            ₹ {props?.cardData?.backtest_results?.summary?.max_profit}
                        </Text>
                    </View>

                    <View style={styles.summaryCol}>
                        <Text style={[styles.summaryLabel, { color: mainColors.headingTextColor }]}>Maximum Loss</Text>
                        <Text
                            style={[styles.summaryValue, { color: mainColors.redText }]}
                        >
                            ₹ -{props?.cardData?.backtest_results?.summary?.max_loss}
                        </Text>
                    </View>
                </View>
            </View>

            {/* About this Algo */}
            <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>About this Algo</Text>

                {renderBulletList(aboutBullets, aboutExpanded)}

                {renderViewLessMore(aboutExpanded, () =>
                    setAboutExpanded(prev => !prev),
                )}
            </View>

            {/* Disclaimer */}
            <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Disclaimer</Text>

                {renderBulletList(disclaimerBullets, disclaimerExpanded)}

                {renderViewLessMore(disclaimerExpanded, () =>
                    setDisclaimerExpanded(prev => !prev),
                )}
            </View>
        </View>
    )
}

export default MarketPlaceOverviewComponent