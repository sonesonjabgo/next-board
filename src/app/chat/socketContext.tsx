"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ClientSocketType } from "../../types/socket.type";

interface ISocketContext {
  socket: ClientSocketType | null;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<ClientSocketType | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket: ClientSocketType = io({
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socket.on("connect", () => {
      console.log("연결이 되었습니다.");
      setIsConnected(true);
    });

    socket.on("error", (error: Error) => {
      console.error(error);
    });

    socket.on("disconnect", () => {
      console.log("연결이 끊겼습니다.");
      setIsConnected(false);
    });

    setSocket(socket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
