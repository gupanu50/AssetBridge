import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
// import {onlineManager} from '@tanstack/react-query';
// import SnackbarHandler from './SnackbarHandler';
import { store } from '../Redux/store';
import snackbarHandler from './snackbarHandler';
// Testing Staging server
// export const NEW_BASE_URL = 'http://172.16.8.17:8083';
// Dev Server
// export const NEW_BASE_URL = 'http://10.10.10.17:8083';
export const NEW_BASE_URL = 'http://13.234.232.141:8000';
export const NEW_BASE_URL_1 = 'http://13.234.232.141:8001';
export const NEW_WEB_SOCKET_URL = 'ws://13.234.232.141:8001/price/ws';
export const API_KEY_GOOGLE = 'AIzaSyAufrejjrpoYVAw7MJL-rBAevjechTCMzE';
export const GOOGLE_PLACES_API_BASE_URL =
  'https://maps.googleapis.com/maps/api';
// ------------------------------------------------------------------------------------

type GenericApiError = {
  message?: string;
  detail?: string;
  errors?: Record<string, string[]>;
};

/**
 * ✅ IST time safe check (no parsing issues)
 */
function getISTParts() {
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(new Date());

  const obj: any = {};
  for (const p of parts) obj[p.type] = p.value;

  return {
    weekday: String(obj.weekday), // "Mon", "Tue"...
    hour: Number(obj.hour),
    minute: Number(obj.minute),
  };
}

// NSE market hours: 09:15 to 15:30 IST (Mon-Fri)
export function isMarketOpenIST(): boolean {
  const { weekday, hour, minute } = getISTParts();
  if (weekday === "Sat" || weekday === "Sun") return false;

  const mins = hour * 60 + minute;
  return mins >= (9 * 60 + 15) && mins <= (15 * 60 + 30);
}

export const fetcher = async (config: AxiosRequestConfig) => {
  const { url, method, data, headers, baseURL } = config;
  const token = store.getState().auth?.userData?.access;
  return await axios.request({
    baseURL: baseURL ?? NEW_BASE_URL,
    url,
    method: method ?? 'GET',
    data,
    ...config,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      deviceType: Platform.OS,
      ...config?.headers,
      ...headers,
      'Content-Type': 'application/json',
      // Token: token,
    },
  });
};

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<GenericApiError>;
    const data = err.response?.data;
    const fieldMsg = data?.errors
      ? Object.values(data.errors)?.[0]?.[0]
      : undefined;
    return (
      fieldMsg ||
      data?.message ||
      data?.detail ||
      err.message ||
      "Something went wrong"
    );
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
};

export const ConstantStrings = {
  emailId: 'Email-Id',
  password: 'Password',
  login: 'Login',
  forgotPassword: 'Forgot Password?',
  forgotemailId: 'EmailId / Phone',
  signUp: 'Sign Up',
  termsAndConditions: 'I agree to the Terms & Conditions',
  sendotp: 'Send OTP',
  sendLink: 'Send verification link',
};

export const mainColors = {
  headingTextColor: '#AFAFAF',
  googleButton: '#151515',
  buySellColor: '#002238',
  descText: '#737373',
  swiperPnl: '#0DB14B',
  dayMonthBg: '#252525',
  manualBg: '#272727',
  pnlCard: '#1D1D1D',
  moversCards: '#2F2F2F',
  swiperBgPnl: '#2c3a3a',
  swiperMaxDD: '#EA4335',
  swiperMaxDDbg: '#4f2e2e',
  noRed: '#D92D20',
  inputBorder: '#4D4D4D',
  inputLabel: '#9B9B9B',
  lastUpdatedBg: '#232323',
  intraday: '#474747',
  mainButton: '#0072BC',
  contactAny: '#7E7F82',
  transactionTime: '#636466',
  warningIcon: '#F7A90B',
  onboardFromYeserdayPositive: '#FEB95A',
  greenBg: '#1b3b27',
  errorRed: '#FF1400',
  historyCheck: '#1b3b27',
  warningBg: '#493a1a',
  redBg: '#472523',
  redBorder: '#EA4335',
  redText: '#EA4335',
  greenText: '#0DB14B',
  greenBorder: '#0DB14B',
  profileConsoleChips: '#041825',
  profileRefer: '#082238',
  activeDot: '#66AAD7',
  niftyBorder: '#303030',
  instrument: '#202020',
  dateBg: '#333232',
  lineColor: '#373737',
  activeDotStatement: '#15364d',
  inActiveDot: '#CCE3F2',
  buyButton: '#0DB14B',
  commonCardLine: '#323232',
  sellButton: '#DC3545',
  appColor: '#0073F7',
  themeBlue: '#0073F7',
  drawerName: '#042C5C',
  retailerInfo: '#27D4FE',
  separatorGrey: '#979797',
  separatorGreyBg: '#D7D7D7',
  separatorTarget: '#F8FCFF',
  LedgerCountBg: '#EBF3FD',
  LedgerText: '#77869E',
  separatorGreyLight: 'rgba(151,151,151,0.15)',
  textBlue: '#5F6AE3',
  divider: '#BCBCBC',
  dividerDrawer: '#E8F0FD',
  textGrey: '#4A4A4A',
  textGrey1: '#414141',
  textGreyLight: 'rgba(74, 74, 74,0.9)',
  textGreyLightExtra: 'rgba(74, 74, 74,0.6)',
  materialLabelGrey: 'rgba(124,135,165,0.6)',
  screenBackground: 'rgb(240, 250, 255)',
  screenBackground1: '#839BB0',
  screenBackground2: '#6f808f',
  white: 'white',
  red: 'red',
  black: 'black',
  transparent: '#00000000',
  transparentDark: 'rgba(151,151,151,0.3)',
  uploadButton: '#348FBA',
  transparentTab: 'rgba(151,151,151,0)',
  greenDark: '#489289',
  green: '#57BB8A',
  greenLight: '#8CE1A4',
  fintechButton: '#61669D',
  pinkLight: '#FFE2E5',
  homeBgColor: '#EEF2FE',
  blue: '#0072BC',
  blueChart: '#0073F7',
  greenChart: '#57BB8A',
  redChart: '#FF625B',
  redDarkChart: '#DB4655',
  orangeChart: '#FA9917',
  yellowChart: '#F3CA3E',
  blueWioletChart: '#5F6AE3',
  loaderBg: 'rgba(255, 255, 255, 0.2)',
  homeSelected: '#1339A8',
  homeUnSelected: '#4E73DF',
  todaySelection: '#E7493B',
  tomorrowSelection: '#F38303',
  nextDaySelection: '#F8B652',

  alertColor: '#FF7700',
  demoScheduleColor: '#36B9CC',
  callbackColor: '#E5D411',
  demoDoneColor: '#55D6A7',
  leadHeaderBg: '#D4DEFF',
  textGreyLightNew: '#4F4F4F',
  textGreyLightNew1: '#828282',

  calenderGreen: '#19c2a1',
  calenderYellow: '#fa9809',
  calenderBlue: '#1072e0',
  calenderDarkBlue: '#4f658e',
  light: '#ffffff',

  green2: '#37d19a',
  greenDark2: '#11866c',
  blue500: '',
};
export const fontFamily = {
  poppinsRegular: 'Poppins-Regular',
  poppinsBold: 'Poppins-Bold',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsLight: 'Poppins-Light',
  poppinsExtraBold: 'Poppins-ExtraBold',
  poppinsMedium: 'Poppins-Medium',
  poppinsBlack: 'Poppins-Black',
};
export const onError = (error: any) => {
  if (error?.response) {
    if (error?.response?.data?.message) {
      snackbarHandler.errorToast(error?.response?.data?.message);
    }
    if (error?.response?.status === 401) {
    }
  } else {
  }
};
