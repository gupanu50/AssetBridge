import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '.';

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;
