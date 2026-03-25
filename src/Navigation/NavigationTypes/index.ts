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
  OptionsChain: { segment: string, symbol: string };
  MarketPlace: {
    cardData: {
      name: string;
      bot_id: string;
      tags: {
        description: string;
      };
      is_subscribed: boolean;
      description: string;
      minimum_capital_required: string;
      backtest_results: {
        summary: {
          start_date: string;
          max_drawdown: number;
          net_pnl: number;
          avg_pnl_trade: number;
          total_trades: number;
          win_rate: number;
          recommended_trade_start_date: string;
          recommended_trade_end_date: string;
          rr_ratio: number;
          max_loss: number;
          max_profit: number;
          expectancy_ratio: number;
        },
        trade_logic: [];
        daily_pnl: []
      }
    }
  };
  SignUp: undefined;
  ChangePassword: undefined;
  Notifications: undefined;
  BuySellOrder: {
    buySelldata: {
      paramItem: any;
      nav: string;
      buynav: string;
      isOptionChainFlow?: boolean;
    },
  };
  ContactUs: undefined;
  TransactionHistory: undefined;
  AlgoMain: { item: any };
  Profile: undefined;
  ProfileSettings: {
    profileData: {
      broker_auth: {
        status: string,
        color: string,
        message: string
      },
      last_login: null,
      username: string,
      profile_picture_url: string;
      first_name: string,
      last_name: string,
      email: string,
      country_code: string,
      contact: string,
      portfolio_balance: string,
      available_balance: string,
      invested_amount: string,
    }
  };
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
  TradingView: {
    symbol: string;
  };
};
export type BottomStackParamList = {
  Home: undefined;
  Algo: undefined;
  Portfolio: undefined;
  Watchlist: undefined;
  Profile: undefined;
};
