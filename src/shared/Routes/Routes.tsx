import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import Chat from '../../pages/Chat';
import Home from '../../pages/Home';
import React from 'react'
import { Switch, Redirect } from 'react-router-dom';
import RoutesConstants from '../../constants/RouteConstants';
import AuthWrapper from '../Wrapper/AuthWrapper';
import MainWrapper from '../Wrapper/MainWrapper';

const Routes = () => {
  return (
    <>
    <Switch>
        <MainWrapper path={RoutesConstants.Login} component={Login} />
        <MainWrapper path={RoutesConstants.SignUp} component={SignUp} />
        <AuthWrapper path={RoutesConstants.Home} component={Home} />
        <AuthWrapper path={RoutesConstants.ChatPage} component={Chat} />
        <Redirect to={RoutesConstants.Home} />
    </Switch></>
  )
}

export default Routes
{/* <Route path="/chat/:id" component={Chat} />
						<Route component={Home} /> */}