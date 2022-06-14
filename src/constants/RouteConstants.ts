import { React_App_Url } from "../utils/config";

export const baseURL = React_App_Url;

const RoutesConstants = {
    Login: baseURL + '/login',
    SignUp: baseURL + '/signUp',
    Logout: baseURL +'/logout',
    Home: baseURL + '/home',
    ChatPage: baseURL + '/chat/:id'
  };
  export default RoutesConstants;