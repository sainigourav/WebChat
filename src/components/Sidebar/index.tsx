import React from "react";
import "./styles/main.css";
import Icon from "../Icon";
import Alert from "./Alert";
import Contact from "./Contact";
import OptionsBtn from "../OptionsButton";
import { useUsersContext } from "../../context/usersContext";
import { useHistory } from "react-router-dom";
import { ImageAPI } from "../../utils/config";
import { useSelector } from "react-redux";

const Sidebar = () => {
	const { users: contacts } = useUsersContext();
	const user = useSelector((state:any) => state.auth);

	const history = useHistory();
	const userId = parseInt(history.location.pathname.replace("/chat/",""));
	return (
		<aside className="sidebar">
			<header className="header">
				<div className="sidebar__avatar-wrapper">
					<img src={`${ImageAPI}/${user.profilePic}`} alt="any" className="avatar" />
				</div>
				<div className="sidebar__actions">
					<button className="sidebar__action" aria-label="Status">
						<Icon
							id="status"
							className="sidebar__action-icon sidebar__action-icon--status"
						/>
					</button>
					<button className="sidebar__action" aria-label="New chat">
						<Icon id="chat" className="sidebar__action-icon" />
					</button>
					<OptionsBtn
						className="sidebar__action"
						ariaLabel="Menu"
						iconId="menu"
						iconClassName="sidebar__action-icon"
						options={[
							"New group",
							"Create a room",
							"Profile",
							"Archived",
							"Starred",
							"Settings",
							"Log out",
						]}
					/>
				</div>
			</header>
			<Alert />
			<div className="search-wrapper">
				<div className="search-icons">
					<Icon id="search" className="search-icon" />
					<button className="search__back-btn">
						<Icon id="back" />
					</button>
				</div>
				<input className="search" placeholder="Search or start a new chat" />
			</div>
			<div className="sidebar__contacts">
				{contacts.map((contact:any, index:number) => (
					<Contact key={index} contact={contact} userId={userId} />
				))}
			</div>
		</aside>
	);
};

export default Sidebar;
