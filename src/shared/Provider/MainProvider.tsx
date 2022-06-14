import React from 'react'
import { Redirect } from 'react-router-dom'

const MainProvider = (props:any) => {
  return (
    <>
         
          {localStorage.getItem("token") != null ? (
        <Redirect to="/home" />
    ) : (props.children
      
    )}
    </>
  )
}

export default MainProvider