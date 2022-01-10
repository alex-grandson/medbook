import { combineReducers } from 'redux';

import { configureStore } from '@reduxjs/toolkit';

import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { medbookAPI } from './redux/medbookAPI';
import authReducer from './redux/authSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [medbookAPI.reducerPath]
};

const rootReducer = combineReducers({
  auth: authReducer,
  [medbookAPI.reducerPath]: medbookAPI.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(medbookAPI.middleware)
});
