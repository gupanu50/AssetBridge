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
  side: string;
  submitted_at: string;
  quantity: string;
  LTP: string;
  product_type: string;
  status: string;
  limit_price: string;
  segment: string;
  Source: string;
};
