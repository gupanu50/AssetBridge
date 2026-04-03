export interface LabelItem {
  label: string;
}
export type TopTab = {
  id: string;
  label: string;
};
export type FlatItem = {
  id: number;
  symbol: string;
  exchange: string;
  source_type?: string;
  realized_pnl: number;
  direction: string;
  entry_time: string;
  original_quantity: string;
  entry_price: string;
  product_type: string
  Product: string;
  Status: string;
  Price: string;
  Source: string;
  exit_time: string;
  exit_price: string;
};

export type PositionClosedProps = {
  isShow: boolean;
}