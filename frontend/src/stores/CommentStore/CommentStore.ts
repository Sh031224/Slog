import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Comment from "../../assets/api/Comment";

interface CommentTypeResponse {
  status: number;
  message: string;
  data: {
    comments: CommentType[];
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

interface RepliesResponse {
  status: number;
  message: string;
  data: {
    replies: ReplyType[];
  };
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

interface PostCommentResponse {
  status: number;
  message: string;
}

@autobind
class LoginStore {
  @observable comments: CommentType[] = [];

  @action
  initComments = () => {
    this.comments = [];
  };

  @action
  getComments = async (post_idx: number): Promise<CommentTypeResponse> => {
    try {
      const response: CommentTypeResponse = await Comment.GetComments(post_idx);

      this.comments = response.data.comments;

      return new Promise(
        (resolve: (response: CommentTypeResponse) => void, _reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  getReplies = async (comment_idx: number): Promise<RepliesResponse> => {
    try {
      const response: RepliesResponse = await Comment.GetReplies(comment_idx);

      return new Promise(
        (resolve: (response: RepliesResponse) => void, _reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  commentCreate = async (
    post_idx: number,
    content: string,
    is_private?: boolean
  ): Promise<PostCommentResponse> => {
    try {
      const response = await Comment.CreateComment(
        post_idx,
        content,
        is_private
      );

      return new Promise(
        (resolve: (response: PostCommentResponse) => void, _reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  commentModify = async (
    comment_idx: number,
    content: string
  ): Promise<PostCommentResponse> => {
    try {
      const response = await Comment.ModifyComment(comment_idx, content);

      return new Promise(
        (resolve: (response: PostCommentResponse) => void, _reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  commentDelete = async (comment_idx: number): Promise<PostCommentResponse> => {
    try {
      const response = await Comment.DeleteComment(comment_idx);

      return new Promise(
        (resolve: (response: PostCommentResponse) => void, _reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };
  @action
  replyCreate = async (
    comment_idx: number,
    content: string,
    is_private?: boolean
  ): Promise<PostCommentResponse> => {
    try {
      const response = await Comment.CreateReply(
        comment_idx,
        content,
        is_private
      );

      return new Promise(
        (resolve: (response: PostCommentResponse) => void, _reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  replyModify = async (
    reply_idx: number,
    content: string
  ): Promise<PostCommentResponse> => {
    try {
      const response = await Comment.ModifyReply(reply_idx, content);

      return new Promise(
        (resolve: (response: PostCommentResponse) => void, _reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  replyDelete = async (reply_idx: number): Promise<PostCommentResponse> => {
    try {
      const response = await Comment.DeleteReply(reply_idx);

      return new Promise(
        (resolve: (response: PostCommentResponse) => void, _reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };
}

export default LoginStore;
