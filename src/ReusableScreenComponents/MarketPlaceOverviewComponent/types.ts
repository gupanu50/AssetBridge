export type OverViewProps = {
    cardData: {
        name: string;
        description: string;
        minimum_capital_required: string;
        backtest_results: {
            summary: {
                start_date: string;
                max_drawdown: number;
                net_pnl: number;
                total_trades: number;
                win_rate: number;
                avg_pnl_trade: number;
                rr_ratio: number;
                max_loss: number;
                max_profit: number;
                expectancy_ratio: number;
            }
        }
    }
}