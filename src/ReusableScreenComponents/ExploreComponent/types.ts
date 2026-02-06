export type MoverData = {
  id: string;
  name?: string; // Make name optional for 'isViewAll' case
  price?: string; // Make price optional for 'isViewAll' case
  chg?: string; // Make chg optional for 'isViewAll' case
  logo?: any;
  isUp?: boolean;
  isViewAll?: boolean; // isViewAll is optional, doesn't require other fields
};

export type MoversApiProps = {
  symbol: string;
  current_price: number;
  absolute_change: number;
  isViewAll?: boolean;
  id?: string;
}
