import { SetStateAction } from "react";

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
  is_editable: boolean;
  is_cancellable: boolean;
  source_type?: string;
  side: string;
  average_price: number;
  submitted_at: string;
  quantity: string;
  LTP: string;
  product_type: string;
  status: string;
  limit_price: string;
  segment: string;
  Source: string;
};
export type EditModalProps = {
  visibile: boolean;
  setVisible: (value: boolean) => void;
  selectedItem?: FlatItem;
}

export type CancelOrderApiProp = {
  id: number;
}

export type EditOrderApiProp = {
  id: number;
  limit_price: number;
  quantity: number;
}