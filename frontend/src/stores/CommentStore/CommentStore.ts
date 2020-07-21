import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import Comment from "../../assets/api/Comment";

interface CommentType {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx: string | undefined;
  fk_user_name: string | undefined;
  fk_post_idx: number;
  created_at: Date;
  updated_at: Date;
  reply_count: number;
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
}

export default LoginStore;
