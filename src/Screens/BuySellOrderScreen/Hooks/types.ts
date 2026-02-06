export type BuySellProps = {
    symbol: string,
    side: string,
    quantity: number,
    order_type: string,
    product_type: string,
    limit_price: number,
    exchange: string,
    segment: string,
    time_in_force: string,
    is_automated: boolean,
    order_tag: string,
    stop_loss: number,
    take_profit: number
}