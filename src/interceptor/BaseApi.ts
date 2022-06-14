import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import RoutesConstants from '../constants/RouteConstants';
import { API_URL } from '../utils/config';

export const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        headers.set("Access-Control-Allow-Origin", "*");
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
    //       headers.set('Access-Control-Request-Headers', `X-Requested-With,content-type`)
        //   headers.set('Access-Control-Request-Origin', '*')
    //       headers.set('Access-Control-Request-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    //       headers.set('Access-Control-Request-Credentials', 'true')
        }
        return headers
      }
   })

export const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args,api,extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    const { error}:any = result;
    let message: string = "Message_Some_Error_Occured";
    if (error && error !== null && error !== undefined) {
        if (error.status === 401) {
            message = "Unauthorized";
            window.location.href = RoutesConstants.Login;
        } else if (error.status === 403) {
            message = "Unauthorized_Access";
        } else if (error.error) {
            return Promise.reject(message);
        } else if (error.data.message && error.data.message !== null && error.data.message !== undefined) {
            message = error.data.message
        }
        return Promise.reject(message);
    }
    return result;
};

const baseApi = createApi({
 reducerPath: 'baseApi',
 keepUnusedDataFor:0,
 baseQuery: baseQueryWithAuth,
 endpoints: () => ({})
})

export default baseApi;