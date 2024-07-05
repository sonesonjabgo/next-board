"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "./socketContext";
import { IMessage } from "../../types/chat.type";

function ChatPage() {
  const { socket, isConnected } = useSocket();
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    socket?.on("message", (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") sendMessage();
    };
    window.addEventListener("keyup", handleEnter);
    return () => window.removeEventListener("keyup", handleEnter);
  });

  const sendMessage = async () => {
    if (currentMessage) {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          username: "재형",
          userId: "test123",
          content: currentMessage,
        }),
      });

      if (res.ok) {
        setCurrentMessage("");
      }
    }
  };

  return (
    <>
      <div>
        {isConnected ? <div>connected</div> : <div>not connected</div>}
        chatlist:
        {messages.length}
        {messages.length !== 0 ? (
          messages.map((message, index) => (
            <div key={index}>chat: {message.content}</div>
          ))
        ) : (
          <p>nothing</p>
        )}
      </div>
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </>
  );
}

export default ChatPage;
