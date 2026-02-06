export type TopTab = {
  id: string;
  label: string;
};

export type WatchRow = {
  items: any
  id: string;
  symbol: string;
  exchange: string;
  price: string;
  change: string;
  isUp: boolean;
};

export type TopTabApi = {
  id: string;
  name: string;
};