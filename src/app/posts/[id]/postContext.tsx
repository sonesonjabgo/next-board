"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IPostDetail, IReply } from "../../../types/post.type";

interface PostContextProps {
  post: IPostDetail | null;
  loading: boolean;
  addReply: (reply: any) => void;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const usePost = (): PostContextProps => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};

async function fetchDetailPage(param: string): Promise<IPostDetail> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/board/${param}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

interface PostProviderProps {
  id: string;
  children: ReactNode;
}

function PostProvider({ id, children }: PostProviderProps) {
  const [post, setPost] = useState<IPostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDetailPage(id);
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const addReply = (reply: IReply) => {
    setPost((prevPost) => {
      if (!prevPost) return prevPost;
      return {
        ...prevPost,
        reply: [...prevPost.reply, reply],
      };
    });
  };

  return (
    <PostContext.Provider value={{ post, loading, addReply }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
