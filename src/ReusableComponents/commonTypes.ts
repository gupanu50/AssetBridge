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
};

export type NewsItemProps = {
  id: string;
  time: string;
  img: any;
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
  value: string;
  setValue: (value: string) => void;
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
