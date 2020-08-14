import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from "react";
import PostReply from "../../components/Post/PostReply";

interface PostReplyContainerProps {
  comment: CommentType;
  comment_idx: number;
  admin: boolean;
  userId: number;
  login: boolean;
  getReplies: (comment_idx: number) => Promise<RepliesResponse>;
  modifyReply: (reply_idx: number, content: string) => Promise<void>;
  deleteReply: (reply_idx: number) => void;
}

interface RepliesResponse {
  status: number;
  message: string;
  data: {
    replies: ReplyType[];
  };
}

interface CommentType {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx: number | undefined;
  fk_user_name: string | undefined;
  fk_post_idx: number;
  created_at: Date;
  updated_at: Date;
  reply_count: number;
}

interface ReplyType {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx: number | undefined;
  fk_user_name: string | undefined;
  fk_comment_idx: number;
  created_at: Date;
  updated_at: Date;
}

const PostReplyContainer = ({
  getReplies,
  admin,
  userId,
  comment_idx,
  login,
  modifyReply,
  deleteReply,
  comment
}: PostReplyContainerProps) => {
  const [replies, setReplies] = useState<ReplyType[]>([]);

  const getRepliesCallback = useCallback(() => {
    getReplies(comment_idx).then((res: RepliesResponse) => {
      setReplies(res.data.replies);
    });
  }, [comment, comment_idx]);

  useEffect(() => {
    getRepliesCallback();
  }, [getRepliesCallback]);

  return (
    <>
      <PostReply
        modifyReply={modifyReply}
        deleteReply={deleteReply}
        replies={replies}
        admin={admin}
        userId={userId}
        login={login}
      />
    </>
  );
};

export default PostReplyContainer;
