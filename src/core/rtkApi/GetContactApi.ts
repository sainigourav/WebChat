import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import base64 from 'base-64';
// import jwt from 'jwt-decode';
import { initialState } from '../state/auth.state';
import { updateObject } from '../../utils/utility.helpers';
import URLConstants from '../../constants/URLConstants';
import baseApi from '../../interceptor/BaseApi';


export const getContactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   getContact: builder.query({
    query: () => ({
     url: URLConstants.GetContact
    })
   })
  })
 })
 
 export const getContactSlice = createSlice({
   name: 'getContact',
   initialState,
   reducers: {
     getContactSuccess: (oldState:any,action: PayloadAction<any>) =>{
         debugger
       const obj = {
        //  token: action.payload.AuthToken,
        //  userId: action.payload.UserId,
        //  userName: action.payload.UserName,
        //  userType: action.payload.UserType,
        //  error: null,
        //  loading: false
       }
       return updateObject(oldState,obj)
     }
   },
   extraReducers: (builder) => {
     builder
      .addMatcher(
       getContactApi.endpoints.getContact.matchPending,
       (oldState) => {
         return updateObject(oldState, { error: null, loading: true })
       })
      .addMatcher(
       getContactApi.endpoints.getContact.matchFulfilled,
       (oldState, { payload }) => {
         debugger
        //  const data : any = jwt(payload.AuthToken); 
        //  const obj = {
        //    token: payload.AuthToken,
        //    userId: payload.UserId,
        //    userName: data.UserName,
        //    userType: data.UserType,
        //    error: null,
        //    loading: false
        //  }
        //  return updateObject(oldState,obj)
       })
      .addMatcher(
       getContactApi.endpoints.getContact.matchRejected,
       (oldState, { payload }) => {
         return updateObject(oldState,{loading:false,error:payload})
       })
   }
 })
 
 export default getContactSlice.reducer
 export const { getContactSuccess } = getContactSlice.actions
 export const { useLazyGetContactQuery } = getContactApi
