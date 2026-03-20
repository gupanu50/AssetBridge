import { JSX } from 'react';
import { ImageSourcePropType, KeyboardTypeOptions, TextStyle, ViewStyle } from 'react-native';
import { MainStackScreenProps } from '../Navigation/NavigationTypes/screenTypes';
import { WatchRow } from '../Screens/WatchListScreen/type';
export type AnchorRect = { x: number; y: number; width: number; height: number };
export type PropCommonCardTypes = {
  logo: ImageSourcePropType;
  is_subscribed?: boolean;
  name: string;
  sub: string;
  tagLeft: string;
  tagRight: string;
  dayPnl?: string;
  ltpChangeMonth: number;
  rewardPct: number;
  ddPct: number;
  rewardPctMonth: number;
  ddPctMonth: number;
  dayReward?: string;
  dayDD?: string;
  ltp: number;
  ltpChange: number;
  intraday: string;
  intradayChange: string;
  pAndL: string;
  pAndLChange: string;
  status: string;
  onPress?: () => void;
  onPressSubscribe?: () => void;
};
export type PropCommonCardApiTypes = {
  logo: ImageSourcePropType;
  name: string;
  tags?: {
    description: string;
  };
  is_subscribed: boolean;
  instance_id: number;
  running_status: string;
  bot_id: number;
  sub: string;
  tagLeft: string;
  tagRight: string;
  ltp?: number;
  ltpChange: number;
  intraday: string;
  intradayChange: string;
  pAndL: string;
  pAndLChange: string;
  status: string;
  onPress?: () => void;
  description: string;
  backtest_results: {
    summary: {
      day?: {
        net_pnl: string;
        total_trades: string;
        max_drawdown: string;
        net_pnl_pct?: number;
        Reward_risk_ratio_percentage: number;
        max_dd_pct: number;
      };
      month?: {
        net_pnl: number;
        total_trades: string;
        max_drawdown: string;
        net_pnl_pct?: number;
        Reward_risk_ratio_percentage: number;
        max_dd_pct: number;
      };
      net_pnl: number;
      total_trades: string;
      max_drawdown: string;
    };
    daily_pnl: [
      { cumulative_pnl: number; date: string; pnl: number }
    ]
  }
};
export type NewsItemProps = {
  published_at: string;
  img?: string;
  url?: string;
  source?: string;
  image_url?: string;
  title: string;
  onPress?: () => void;
};

export type TopTabProps = {
  id?: string;
  label?: string;
  activeTab?: string;
  index?: number;
  isActive?: boolean;
  setIsActive?: any;
  style?: ViewStyle;
  isRightText?: boolean;
  isRightNew?: boolean;
};

export type inputProps = {
  placeholder?: string;
  style?: ViewStyle | TextStyle;
  containerStyle?: ViewStyle;
  lines?: number;
  editable?: boolean;
  leftImage?: JSX.Element;
  autoFocus?: boolean;
  rightImage?: JSX.Element;
  max?: number;
  secure?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  value?: any;
  setValue?: (value: any) => void;
  errorMessage?: string;
};

export type DrawerBackHeaderProps = {
  title: string;
  isShowInfoIcon?: boolean;
  isShowDownloadIcon?: boolean;
  navigation?: MainStackScreenProps<'Profile' | 'ProfileSettings' | 'ContactUs' | 'TransactionHistory' | 'Statement' | 'PaymentMethod'>['navigation'];
};

export type KababProps = {
  visible: boolean,
  setVisible: (value: boolean) => void;
  refetch: () => void;
  anchor?: AnchorRect | null;
  item?: WatchRow | null;
  navigation: MainStackScreenProps<'HomeTab' | 'WatchList' | 'Algo' | 'MarketPlace'>['navigation'];
}

export type CommonTopBtnSliderProps = {
  navigation?: MainStackScreenProps<'HomeTab' | 'Algo' | 'WatchList' | 'MarketPlace'>['navigation'];
}

export type IndexKey = 'NIFTY50' | 'SENSEX' | 'NIFTYBANK';

export type IndexRow = {
  key: IndexKey;
  label: string;
  ltp?: number;
  absChange?: number;
  pctChange?: number;
};
export type CommonHeaderProps = {
  onPressBell?: () => void;
  navigation?: MainStackScreenProps<'HomeTab' | 'WatchList' | 'Algo' | 'MarketPlace'>['navigation']
};

/** ✅ API shape */
export type ContractRow = any[];
export type ContractsObj = Record<string, ContractRow[]>;

export type SearchItem = {
  symbol: string;   // row[2]
  fullName: string; // row[3]
  fullNameLower: string;
  segment: string;  // row[9]
  exchange?: string;
};

export type PaymentScreenProps = {
  amount: number;
  id: string;
  currency: string;
  subscription_id: string;
  email: string;
  contact: string;
  name: string;
}