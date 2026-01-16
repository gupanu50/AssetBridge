import { AppState } from 'react-native';
// import {focusManager, onlineManager} from 'react-query';
import { focusManager, onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { QueryClient } from '@tanstack/react-query';
import { onError } from './helper';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
    mutations: {
      onError,
    },
  },
});

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(state.isConnected ? true : false);
  });
});

focusManager.setEventListener((handleFocus: any) => {
  const listener = AppState.addEventListener('change', handleFocus);
  return () => {
    listener.remove();
  };
});
