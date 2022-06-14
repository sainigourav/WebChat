import Loader from '../../components/Loader';
import Sidebar from '../../components/Sidebar'
import React, {useState, useEffect, FC} from 'react'
import { Route } from 'react-router-dom'
import AuthProvider from '../Provider/AuthProvider'
import { UsersProvider } from '../../context/usersContext';
import { useLazyGetContactQuery } from '../../core/rtkApi/GetContactApi';

const userPrefersDark =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches;

const AuthWrapper:FC<any> = ({component:Component, ...rest}) => {

    const [appLoaded, setAppLoaded] = useState(false);
    const [users, setUsers] = useState([]);
	const [startLoadProgress, setStartLoadProgress] = useState(false);
    const [contact, contactResult] = useLazyGetContactQuery();
    const token = localStorage.getItem('token');
    
	useEffect(() => {
        if(token && token.length > 0){
            contact({preferCacheValue:false});
        }
	}, [])

    useEffect(() => {
        if(contactResult.isLoading)
            setStartLoadProgress(true);
    }, [contactResult.isLoading])

	useEffect(() => {
		if(contactResult.isSuccess){
			setUsers(contactResult.data)
            // setStartLoadProgress(false);
            setAppLoaded(true)
            // stopLoad();
        }
	}, [contactResult.isSuccess])
    

	// useEffect(() => {
	// 	if (userPrefersDark) document.body.classList.add("dark-theme");
	// 	stopLoad();
	// }, []);

	// const stopLoad = () => {
	// 	// setStartLoadProgress(true);
	// 	setTimeout(() => setAppLoaded(true), 3000);
	// };

	if (!appLoaded) return <Loader done={startLoadProgress} />;

  return (
    <>
    {
        contactResult.isLoading ?  <Loader done={startLoadProgress} /> :
        (
            <div className="app">
        <p className="app__mobile-message"> Only available on desktop 😊. </p>
            <div className="app-content">
            <AuthProvider>
                <UsersProvider setUsers={setUsers} users={users}>
                    <Sidebar />
                    <Route {...rest} render={matchProps => (
                        <Component {...matchProps}/>
                    )}/>
                </UsersProvider>
            </AuthProvider>
        </div>
    </div>
        )
    }
    </>
  )
}

export default AuthWrapper