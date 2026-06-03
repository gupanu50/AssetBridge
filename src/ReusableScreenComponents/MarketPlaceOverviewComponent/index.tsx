import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import IconButton from '../../ReusableComponents/iconButton';
import { mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import { styles } from './styles';
import { OverViewProps } from './types';
import { formatAmount } from '../../ReusableComponents/commonFunctions';

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
            'Trading in derivatives carries substantial risk of loss and is not suitable for every investor. The algorithms listed on Asset Bridge are based on historical and backtested data. Past performance does not guarantee future results.',
            "Asset Bridge is a technology platform that enables algorithmic trade execution through your linked broker account.We do not provide investment advice, portfolio management, orguaranteed returns.All trading decisions and outcomes remain solely your responsibility.",
            `P&L figures shown are derived from the algo's backtested or live track record under specificmarket conditions. Actual results may differ materially due to slippage, liquidity, brokerlatency, and changes in market volatility.`,
            'Please read the full SEBI Risk Disclosure on Derivatives before subscribing to any strategy. By subscribing, you acknowledge that you understand and accept these risks.',
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
                            ₹ {formatAmount(props?.cardData?.backtest_results?.summary?.net_pnl)}
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
                        <Text style={styles.summarySmallValue}>{props?.cardData?.backtest_results?.summary?.win_rate}%</Text>
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
                        <Text style={styles.summaryValuePlain}>{formatAmount(props?.cardData?.backtest_results?.summary?.total_trades)}</Text>
                    </View>

                    <View style={styles.summaryCol}>
                        <Text style={styles.summaryLabel}>Average PnL / Trade</Text>
                        <Text style={styles.summaryValuePlain}>₹ {formatAmount(props?.cardData?.backtest_results?.summary?.avg_pnl_trade)}</Text>
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
                            ₹ {formatAmount(props?.cardData?.backtest_results?.summary?.max_profit)}
                        </Text>
                    </View>

                    <View style={styles.summaryCol}>
                        <Text style={[styles.summaryLabel, { color: mainColors.headingTextColor }]}>Maximum Loss</Text>
                        <Text
                            style={[styles.summaryValue, { color: mainColors.redText }]}
                        >
                            ₹ -{formatAmount(props?.cardData?.backtest_results?.summary?.max_loss)}
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