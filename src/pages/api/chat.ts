import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "./socket/io";

export default function chatAPI(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method === "POST") {
    // 메시지 얻기
    const message = req.body;

    // on('message')가 메시지를 받음
    res.socket.server.io.emit("message", message);

    res.status(201).json(message);
  }
}
