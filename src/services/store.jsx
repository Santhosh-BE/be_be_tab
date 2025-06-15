import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { AuthApi } from './api/AuthApi';
import { CountryApi } from './api/CountryApi';
import { CustomerServiceApi } from './api/CustomerServiceApi';

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [CountryApi.reducerPath]: CountryApi.reducer,
    [CustomerServiceApi.reducerPath]: CustomerServiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthApi.middleware,
      CountryApi.middleware,
      CustomerServiceApi.middleware,
    ),
});
setupListeners(store.dispatch);
