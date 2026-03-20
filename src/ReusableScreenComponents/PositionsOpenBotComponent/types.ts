import { MainStackScreenProps } from "../../Navigation/NavigationTypes/screenTypes";

type InnerPositionOpenProps = {
  navigation?: MainStackScreenProps<'Instrument'>['navigation'];
}
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
  direction: string;
  entry_time: string;
  source_type?: string;
  unrealized_pnl: number;
  quantity: string;
  entry_price: string;
  product_type: string;
  Status: string;
  Price: string;
  Source: string;
};