import { StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { persistor, store } from './Redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NetworkListener from './Utils/networkListener';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigation from './Navigation/StackNavigation/AppNavigation';
export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.gesture}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <SafeAreaView style={styles.safeView}>
                <StatusBar
                  barStyle={'light-content'}
                  animated={true}
                  backgroundColor={'transparent'}
                />
                <AppNavigation />
                <NetworkListener />
              </SafeAreaView>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
  safeView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
