import { Socket } from "socket.io-client";
import { IMessage } from "./chat.type";

export interface ServerToClientEvents {
  basicEmit: (a: number, b: string, c: Buffer) => void;
  error: (error: Error) => void;
  send: (message: IMessage) => void;
  receive: (message: IMessage) => void;
}

export type ClientSocketType = Socket<ServerToClientEvents>;
