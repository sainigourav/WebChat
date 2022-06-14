import React, { useState } from "react";
import Icon from "../Icon";
import "./styles/main.css";
import { useHistory } from 'react-router-dom';
import RoutesConstants from "../../constants/RouteConstants";
import { logoutSuccess, usePostLoginMutation } from "../../core/rtkApi/AuthApi";
import { useDispatch } from "react-redux";

const OptionsBtn = ({
	className,
	iconId,
	iconClassName,
	ariaLabel,
	options = [],
	position = "left",
	showPressed = true,
	...props
}:any) => {
	const [showOptions, setShowOptions] = useState(false);
	const dispatch = useDispatch()
	const [login, loginResult] = usePostLoginMutation({fixedCacheKey:"loginResult"});
	const history = useHistory()
	const LogOut = ()=>{
		loginResult.reset();
		dispatch(logoutSuccess());
		history.push(RoutesConstants.Login);
	}

	return (
		<div className="pos-rel">
			<button
				aria-label={ariaLabel}
				className={`options-btn ${
					showOptions && showPressed ? "options-btn--pressed" : ""
				} ${className || ""}`}
				onClick={() => setShowOptions(!showOptions)}
				{...props}
			>
				<Icon id={iconId} className={iconClassName} />
			</button>
			<ul
				className={`options-btn__options ${
					showOptions ? "options-btn__options--active" : ""
				} ${position === "right" ? "options-btn__options--right" : ""}`}
			>
				{options.map((option:any, index:number) => (
					(option === 'Log out') ? (
						<li className="options-btn__option" onClick={LogOut} key={index}>
						{option}
					</li>
					) :
					(
						<li className="options-btn__option" key={index}>
						{option}
					</li>
					)
				))}
			</ul>
		</div>
	);
};

export default OptionsBtn;
