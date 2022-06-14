/*
The value ofNODE_ENV is set automatically to development (when using npm start),
test (when using npm test) or production (when using npm build).
Thus, from the point of view of create-react-app, there are only three environments.
*/

const config = () => {
    const config = (window).Config;
    if (config === undefined) {
      return {
        ...process.env
      };
    }
    return {
      ...config
    };
  };
  
const appConfig = config();
export const ImageAPI = appConfig.REACT_APP_IMAGE_URL;
export const React_App_Url = appConfig.REACT_APP_PUBLIC_URL;
export const API_URL = appConfig.REACT_APP_API_URL;
  