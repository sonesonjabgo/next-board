"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "./socketContext";
import { IMessage } from "../../types/chat.type";
import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";

const user = "User_" + String(new Date().getTime());

// 내 메시지
const Me = ({ message }: { message: string }) => {
  return (
    <Box p="6px 10px">
      <Text as="p">Me</Text>
      <Box
        bgColor="blue.400"
        color="white"
        maxW="320px"
        borderRadius={8}
        p="6px 8px"
        display="inline-block"
      >
        <Text>{message}</Text>
      </Box>
    </Box>
  );
};

// 상대 메시지
const Other = ({ user, message }: { user: string; message: string }) => {
  return (
    <Box p="6px 10px" textAlign="right">
      <Text as="p" textAlign="right">
        {user}
      </Text>
      <Box
        bgColor="green.400"
        color="white"
        maxW="320px"
        borderRadius={8}
        p="6px 8px"
        display="inline-block"
      >
        <Text>{message}</Text>
      </Box>
    </Box>
  );
};

function ChatPage() {
  const { socket } = useSocket();
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    socket?.on("send", (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  const sendMessage = async (ev: any) => {
    ev.preventDefault();
    if (!currentMessage) return;
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        username: user,
        userId: "test123",
        content: currentMessage,
      }),
    });

    if (res.ok) {
      setCurrentMessage("");
    }
  };

  return (
    <>
      <div>
        chatlist:
        {messages.map((message, index) => (
          <Box key={index}>
            {message.username === user ? (
              <Me message={message.content} />
            ) : (
              <Other user={message.username} message={message.content} />
            )}
          </Box>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default ChatPage;
