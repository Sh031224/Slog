import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import Comment from "../../assets/api/Comment";

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
    replies: ReplyType;
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

@autobind
class LoginStore {
  @observable comments: CommentType[] = [];

  @action
  getComments = async (post_idx: number) => {
    try {
      const response = await Comment.GetComments(post_idx);

      this.comments = response.data.comments;

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  getReplies = async (comment_idx: number): Promise<RepliesResponse> => {
    try {
      const response: RepliesResponse = await Comment.GetReplies(comment_idx);

      return new Promise(
        (resolve: (response: RepliesResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  modifyComment = async (comment_idx: number, content: string) => {
    try {
      const response = await Comment.ModifyComment(comment_idx, content);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  deleteComment = async (comment_idx: number) => {
    try {
      const response = await Comment.DeleteComment(comment_idx);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };
}

export default LoginStore;
