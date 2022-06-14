import React from "react";
import Icon from "../Icon";
import { Link } from "react-router-dom";
import formatTime from "../../utils/formatTime";
import { useUsersContext } from "../../context/usersContext";
import { ImageAPI } from "../../utils/config";

const Contact = ({ contact, userId }:any) => {
	
	const { setUserAsUnread } = useUsersContext();
	const getLastMessage = () => {
		if(Object.keys(contact.messages).length){
			const messageDates = Object.keys(contact.messages);
			const recentMessageDate = messageDates[messageDates.length - 1];
			const messages = [...contact.messages[recentMessageDate]];
			const lastMessage = messages.pop();
			return lastMessage;
		}
		return {};
	};

	const lastMessage = getLastMessage();

	return (
		<Link
			className={userId === contact._id ? "sidebar-contact selected-contact" : "sidebar-contact"}
			to={`/chat/${contact._id}`}
			onClick={() => setUserAsUnread(contact._id)}
		>
			<div className="sidebar-contact__avatar-wrapper">
				<img
					src={`${ImageAPI}/${contact.profilePic}`}
					alt={contact.name}
					className="avatar"
				/>
			</div>
			<div className="sidebar-contact__content">
				<div className="sidebar-contact__top-content">
					<h2 className="sidebar-contact__name"> {contact.name} </h2>
					<span className="sidebar-contact__time">
						{formatTime(lastMessage.time)}
					</span>
				</div>
				<div className="sidebar-contact__bottom-content">
					<p className="sidebar-contact__message-wrapper">
						{lastMessage.status && (
							<Icon
								id={
									lastMessage?.status === "sent" ? "singleTick" : "doubleTick"
								}
								aria-label={lastMessage?.status}
								className={`sidebar-contact__message-icon ${
									lastMessage?.status === "read"
										? "sidebar-contact__message-icon--blue"
										: ""
								}`}
							/>
						)}
						<span
							className={`sidebar-contact__message ${
								!!contact.unread ? "sidebar-contact__message--unread" : ""
							}`}
						>
							{contact.typing ? <i> typing...</i> : lastMessage?.content}
						</span>
					</p>
					<div className="sidebar-contact__icons">
						{contact.pinned && (
							<Icon id="pinned" className="sidebar-contact__icon" />
						)}
						{!!contact.unread && (
							<span className="sidebar-contact__unread">{contact.unread}</span>
						)}
						<button aria-label="sidebar-contact__btn">
							<Icon
								id="downArrow"
								className="sidebar-contact__icon sidebar-contact__icon--dropdown"
							/>
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Contact;
