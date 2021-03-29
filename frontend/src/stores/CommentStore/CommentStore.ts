import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Comment from "../../assets/api/Comment";
import CommentType from "types/CommentType";
import { GetCommentsResponse, GetRepliesResponse, ResponseType } from "types/Response";

@autobind
class LoginStore {
  @observable comments: CommentType[] = [];

  @action
  initComments = () => {
    this.comments = [];
  };

  @action
  getComments = async (post_idx: number): Promise<GetCommentsResponse> => {
    const response: GetCommentsResponse = await Comment.GetComments(post_idx);

    this.comments = response.data.comments;

    return response;
  };

  @action
  getReplies = async (comment_idx: number): Promise<GetRepliesResponse> => {
    const response: GetRepliesResponse = await Comment.GetReplies(comment_idx);

    return response;
  };

  @action
  commentCreate = async (post_idx: number, content: string, is_private?: boolean): Promise<ResponseType> => {
    const response = await Comment.CreateComment(post_idx, content, is_private);

    return response;
  };

  @action
  commentModify = async (comment_idx: number, content: string): Promise<ResponseType> => {
    const response = await Comment.ModifyComment(comment_idx, content);

    return response;
  };

  @action
  commentDelete = async (comment_idx: number): Promise<ResponseType> => {
    const response = await Comment.DeleteComment(comment_idx);

    return response;
  };

  @action
  replyCreate = async (comment_idx: number, content: string, is_private?: boolean): Promise<ResponseType> => {
    const response = await Comment.CreateReply(comment_idx, content, is_private);

    return response;
  };

  @action
  replyModify = async (reply_idx: number, content: string): Promise<ResponseType> => {
    const response = await Comment.ModifyReply(reply_idx, content);

    return response;
  };

  @action
  replyDelete = async (reply_idx: number): Promise<ResponseType> => {
    const response = await Comment.DeleteReply(reply_idx);

    return response;
  };
}

export default LoginStore;
