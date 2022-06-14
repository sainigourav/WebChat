import React, { FC } from 'react'
import { Route } from 'react-router-dom'
import MainProvider from '../Provider/MainProvider'

const MainWrapper:FC<any> = ({component:Component, ...rest}) => {
  return (
    <>
   <Route {...rest} render={matchProps => (
           <MainProvider>
               <Component {...matchProps}/>
           </MainProvider>
        )}/>
  </>
  )
}

export default MainWrapper