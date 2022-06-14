import { createContext, useContext, useEffect } from "react";
// import contacts from "../data/contacts";
import { cloneDeep } from 'lodash'
import { useSocketContext } from "./socketContext";

const UsersContext = createContext();

const useUsersContext = () => useContext(UsersContext);

const UsersProvider = (props) => {
	const socket = useSocketContext();
	const users = props.users;
	// const [users, props.setUsers] = useState(contacts);

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
		socket.on("fetch_response", fetchMessageResponse);
		socket.on("start_typing", setUserAsTyping);
		socket.on("stop_typing", setUserAsNotTyping);
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

		socket.emit("fetch_response", { userId });
	};

	return (
		<UsersContext.Provider value={{ users, setUserAsUnread, addNewMessage }}>
			{props.children}
		</UsersContext.Provider>
	);
};

export { useUsersContext, UsersProvider };
