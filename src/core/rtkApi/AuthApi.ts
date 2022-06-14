import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import base64 from 'base-64';
import jwt from 'jwt-decode';
import { initialState } from '../state/auth.state';
import { updateObject } from '../../utils/utility.helpers';
import URLConstants from '../../constants/URLConstants';
import baseApi from '../../interceptor/BaseApi';


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   postLogin: builder.mutation({
    query: (authParams:any) => ({
     url: URLConstants.Authenticate,
     method: 'POST',
     body: { email: authParams.email, password: authParams.password }
    })
   })
  })
 })
 
 export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
     loginSuccess: (oldState:any,{ payload }:any) =>{
      const data : any = jwt(payload.token); 
      localStorage.setItem("token",payload.token);
      const obj = {
        token: payload.token,
        userId: data.id,
        email: data.email,
        profilePic: data.profilePic,
        name: data.name,
        error: null,
        loading: false
      }
       return updateObject(oldState,obj)
     },
     logoutSuccess: (oldState:any)=>{
       localStorage.clear();
       return updateObject(oldState,initialState)
     }
   },
   extraReducers: (builder) => {
    builder
     .addMatcher(
      authApi.endpoints.postLogin.matchPending,
      (oldState) => {
        // debugger
        return updateObject(oldState, { error: null, loading: true })
      })
     .addMatcher(
      authApi.endpoints.postLogin.matchFulfilled,
      (oldState, { payload }) => {
        // debugger
        const data : any = jwt(payload.token); 
        localStorage.setItem("token",payload.token);
        const obj = {
          token: payload.token,
          userId: data.id,
          email: data.email,
          profilePic: data.profilePic,
          name: data.name,
          error: null,
          loading: false
        }
        return updateObject(oldState,obj)
      })
     .addMatcher(
      authApi.endpoints.postLogin.matchRejected,
      (oldState, { payload }) => {
        // debugger
        return updateObject(oldState,{loading:false,error:payload})
      })
  }
 })
 
 export default authSlice.reducer
 export const { loginSuccess, logoutSuccess } = authSlice.actions
 export const { usePostLoginMutation } = authApi
 export const { postLogin } = authApi.endpoints