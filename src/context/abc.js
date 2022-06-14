import { createContext, useContext, useEffect, useState } from "react";
import { cloneDeep } from 'lodash'
// import { useLazyGetContactQuery } from "../core/rtkApi/GetContactApi";
// import contacts from "../data/contacts";
import { useSocketContext } from "./socketContext";
import { useSelector } from "react-redux";

const UsersContext = createContext();

const useUsersContext = () => useContext(UsersContext);

const UsersProvider = (props) => {

	const user = useSelector((state) => state.auth);
	const socket = useSocketContext();
	const users = props.users;

	// useEffect(() => {
	// 	socket.emit('join', "WebChat");
	// }, []);
	// const props.setUsers = props.props.setUsers;
	// const [users, props.setUsers] = useState([]);
	// const [contact, contactResult] = useLazyGetContactQuery();

	// useEffect(() => {
	//   contact();
	// }, [])

	// useEffect(() => {
	// 	if(contactResult.isSuccess)
	// 		props.setUsers(contactResult.data)
	// }, [contactResult.isSuccess])
	

	const _updateUserProp = (userId, prop, value) => {
		props.setUsers((users) => {
			const usersCopy = cloneDeep(users);
			let userIndex = users.findIndex((user) => user._id === userId);
			const userObject = usersCopy[userIndex];
			usersCopy[userIndex] = { ...userObject, [prop]: value };
			return usersCopy;
		});
	};

	const setUserAsTyping = (data) => {
		const { userId } = data;
		_updateUserProp(userId, "typing", true);
	};

	const setUserAsNotTyping = (data) => {
		const { userId } = data;
		_updateUserProp(userId, "typing", false);
	};

	const fetchMessageResponse = (data) => {
		props.setUsers((users) => {
			const { userId, response } = data;
			console.log("UI",data);
			let userIndex = users.findIndex((user) => user._id === userId);
			const usersCopy = cloneDeep(users);
			const newMsgObject = {
				content: response,
				sender: userId,
				time: new Date().toLocaleTimeString(),
				status: null,
			};

			usersCopy[userIndex].messages.TODAY.push(newMsgObject);

			return usersCopy;
		});
	};

	useEffect(() => {
		// if(users.length > 0){
			socket.on("fetch_response", fetchMessageResponse);
			socket.on("start_typing", setUserAsTyping);
			socket.on("stop_typing", setUserAsNotTyping);
		// }
	}, [socket]);

	const setUserAsUnread = (userId) => {
		_updateUserProp(userId, "unread", 0);
	};

	const addNewMessage = (userId, message) => {
		let userIndex = users.findIndex((user) => user._id === userId);
		const usersCopy = cloneDeep(users);
		const newMsgObject = {
			content: message,
			sender: null,
			time: new Date().toLocaleTimeString(),
			status: "delivered",
		};

		usersCopy[userIndex].messages.TODAY.push(newMsgObject);
		props.setUsers(usersCopy);
		socket.emit("fetch_response", { userId ,newMsgObject});
		// socket.emit("fetch_response", { sender:user.userId, receiver: userId ,newMsgObject});
	};

	return (
		<UsersContext.Provider value={{ users, setUserAsUnread, addNewMessage, setUserAsTyping }}>
			{props.children}
		</UsersContext.Provider>
	);
};

export { useUsersContext, UsersProvider };