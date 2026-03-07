export type TopTab = {
  id: string;
  label: string;
};

export type WatchRow = {
  items: any
  id: number;
  symbol: string;
  exchange: string;
  price: string;
  change: string;
  isUp: boolean;
};

export type TopTabApi = {
  id: number;
  name: string;
};

export type AddWatchlistItemProps = {
  watchlist?: number;
  symbol?: string;
  exchange?: string;
  segment?: string;
}