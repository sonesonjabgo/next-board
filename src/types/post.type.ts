export interface IPost {
  board_id: string;
  writer: string;
  title: string;
  created_at: Date;
}

export interface IReply {
  reply_id: string;
  writer: string;
  content: string;
  created_at: Date;
}

export interface IPostDetail extends IPost {
  content: string;
  reply: IReply[];
}

export interface ICreatePost {
  writer: string;
  title: string;
  content: string;
}
