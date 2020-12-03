import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Comment from "../../assets/api/Comment";
import CommentType from "types/CommentType";
import {
  GetCommentsResponse,
  GetRepliesResponse,
  ResponseType
} from "types/Response";

@autobind
class LoginStore {
  @observable comments: CommentType[] = [];

  @action
  initComments = () => {
    this.comments = [];
  };

  @action
  getComments = async (post_idx: number): Promise<GetCommentsResponse> => {
    try {
      const response: GetCommentsResponse = await Comment.GetComments(post_idx);

      this.comments = response.data.comments;

      return new Promise(
        (resolve: (response: GetCommentsResponse) => void, _reject) => {
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
  getReplies = async (comment_idx: number): Promise<GetRepliesResponse> => {
    try {
      const response: GetRepliesResponse = await Comment.GetReplies(
        comment_idx
      );

      return new Promise(
        (resolve: (response: GetRepliesResponse) => void, _reject) => {
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
  ): Promise<ResponseType> => {
    try {
      const response = await Comment.CreateComment(
        post_idx,
        content,
        is_private
      );

      return new Promise(
        (resolve: (response: ResponseType) => void, _reject) => {
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
  ): Promise<ResponseType> => {
    try {
      const response = await Comment.ModifyComment(comment_idx, content);

      return new Promise(
        (resolve: (response: ResponseType) => void, _reject) => {
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
  commentDelete = async (comment_idx: number): Promise<ResponseType> => {
    try {
      const response = await Comment.DeleteComment(comment_idx);

      return new Promise(
        (resolve: (response: ResponseType) => void, _reject) => {
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
  ): Promise<ResponseType> => {
    try {
      const response = await Comment.CreateReply(
        comment_idx,
        content,
        is_private
      );

      return new Promise(
        (resolve: (response: ResponseType) => void, _reject) => {
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
  ): Promise<ResponseType> => {
    try {
      const response = await Comment.ModifyReply(reply_idx, content);

      return new Promise(
        (resolve: (response: ResponseType) => void, _reject) => {
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
  replyDelete = async (reply_idx: number): Promise<ResponseType> => {
    try {
      const response = await Comment.DeleteReply(reply_idx);

      return new Promise(
        (resolve: (response: ResponseType) => void, _reject) => {
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
