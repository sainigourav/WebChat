import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import base64 from 'base-64';
// import jwt from 'jwt-decode';
import { initialState } from '../state/auth.state';
import { updateObject } from '../../utils/utility.helpers';
import URLConstants from '../../constants/URLConstants';
import baseApi from '../../interceptor/BaseApi';


export const signUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   signUp: builder.mutation({
    query: (data:any) => ({
     url: URLConstants.SignUp,
     method: 'POST',
    //  headers: {
	// 	'Content-Type': 'multipart/form-data'
	// },
     body: data
    })
   })
  })
 })
  
 export const { useSignUpMutation } = signUpApi
 export const { signUp } = signUpApi.endpoints