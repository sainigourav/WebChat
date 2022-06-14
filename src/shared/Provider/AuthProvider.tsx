import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import { loginSuccess } from '../../core/rtkApi/AuthApi';

function AuthProvider(props:any) {
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("token") != null){
      const token = localStorage.getItem("token");
      dispatch(loginSuccess({token}));
    }
  }, [])

  return (
    <>
      {localStorage.getItem("token") != null ? (
        props.children
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default AuthProvider;
