import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import Loader from "./components/Loader";
import Routes from "./shared/Routes/Routes";

// const userPrefersDark =
// 	window.matchMedia &&
// 	window.matchMedia("(prefers-color-scheme: dark)").matches;

function App() {
	// const [appLoaded, setAppLoaded] = useState(false);
	// const [startLoadProgress, setStartLoadProgress] = useState(false);

	// useEffect(() => {
	// 	if (userPrefersDark) document.body.classList.add("dark-theme");
	// 	stopLoad();
	// }, []);

	// const stopLoad = () => {
	// 	setStartLoadProgress(true);
	// 	setTimeout(() => setAppLoaded(true), 3000);
	// };

	// if (!appLoaded) return <Loader done={startLoadProgress} />;

	return (
		<Switch>
			<Routes/>
		</Switch>
	);
}

export default App;
