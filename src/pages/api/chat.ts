import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "./socket/io";
import { IMessage } from "../../types/chat.type";

const chatHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const message = JSON.parse(req.body) as IMessage;

    res.socket.server.io.emit("message", message);

    res.status(201).json(message);
  }
};

export default chatHandler;
