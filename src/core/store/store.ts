import { configureStore } from '@reduxjs/toolkit'
import {authApi} from '../rtkApi/AuthApi';
import authReducer from '../rtkApi/AuthApi';
import baseApi from '../../interceptor/BaseApi';
import { signUpApi } from '../rtkApi/SignupApi';


const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,signUpApi.middleware,baseApi.middleware),
})

export default store;