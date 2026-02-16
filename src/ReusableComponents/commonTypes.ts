import { JSX } from 'react';
import { ImageSourcePropType, KeyboardTypeOptions, TextStyle, ViewStyle } from 'react-native';
import { MainStackScreenProps } from '../Navigation/NavigationTypes/screenTypes';
export type AnchorRect = { x: number; y: number; width: number; height: number };
export type PropCommonCardTypes = {
  logo: ImageSourcePropType;
  name: string;
  sub: string;
  tagLeft: string;
  tagRight: string;
  ltp: string;
  ltpChange: string;
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
  sub: string;
  tagLeft: string;
  tagRight: string;
  ltp: string;
  ltpChange: string;
  intraday: string;
  intradayChange: string;
  pAndL: string;
  pAndLChange: string;
  status: string;
  onPress?: () => void;
  description: string;
  backtest_results: {
    summary: {
      net_pnl: string;
      total_trades: string;
      max_drawdown: string;
    }
  }
};
export type NewsItemProps = {
  published_at: string;
  img?: ImageSourcePropType;
  title: string;
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
  leftImage?: JSX.Element;
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
  anchor?: AnchorRect | null;
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