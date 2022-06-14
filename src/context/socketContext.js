import { createContext, useContext } from "react";
import io from "socket.io-client";
import { Socket_URL } from "../utils/config";

const SOCKET_URL = Socket_URL;

const socket = io.connect(SOCKET_URL);

const SocketContext = createContext();

const useSocketContext = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

export { useSocketContext, SocketProvider };