import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import "./assets/css/index.css";
// import { UsersProvider } from "./context/usersContext";
import { SocketProvider } from "./context/socketContext";
import { Provider } from 'react-redux';
import store from "./core/store/store";


ReactDOM.render(
    <Provider store={store}>
		<BrowserRouter>
			<SocketProvider>
				{/* <UsersProvider> */}
					<App />
				{/* </UsersProvider> */}
			</SocketProvider>
		</BrowserRouter>
		</Provider>,
    document.getElementById('root')
  );
