import { ImageSourcePropType } from "react-native";

export type MainStackParamList = {
  Splash: undefined;
  Onboard: undefined;
  Login: undefined;
  HomeTab: undefined;
  WatchList: undefined;
  Otp: { mobile?: string, navScr?: string };
  Forget: undefined;
  Algo: undefined;
  Instrument: any;
  OptionsChain: undefined;
  MarketPlace: undefined;
  SignUp: undefined;
  ChangePassword: undefined;
  Notifications: undefined;
  BuySellOrder: undefined;
  ContactUs: undefined;
  TransactionHistory: undefined;
  AlgoMain: { item: any };
  Profile: undefined;
  ProfileSettings: undefined;
  Statement: undefined;
  PaymentMethod: undefined;
  Portfolio: undefined;
  NoData: {
    image: ImageSourcePropType;
    heading: string;
    descText: string;
    redText: string;
    btnLable: string;
  };
};
export type BottomStackParamList = {
  Home: undefined;
  Algo: undefined;
  Portfolio: undefined;
  Watchlist: undefined;
  Profile: undefined;
};
