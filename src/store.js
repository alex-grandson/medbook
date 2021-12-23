import { configureStore } from '@reduxjs/toolkit';
import { medbookAPI } from './redux/medbookAPI';

export const store = configureStore({
  reducer: {
    [medbookAPI.reducerPath]: medbookAPI.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(medbookAPI.middleware)
});
