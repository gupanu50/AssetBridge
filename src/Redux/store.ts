import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer } from './authSlice';
import { compressReducer } from './compressSlice';
import { expiryDataReducer } from './optionChainExpirySlice';

const rootReducer = combineReducers({
  auth: authReducer,
  compress: compressReducer,
  expiryData: expiryDataReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
