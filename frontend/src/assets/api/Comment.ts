import axios from "axios";
import { server } from "../../config/index.json";

class Comment {
  async GetComments(post_idx: number) {
    const url = `${server}/api/v1/comment?post=${post_idx}`;

    const { data } = await axios.get(url);

    return data;
  }

  async GetReplies(comment_idx: number) {
    const url = `${server}/api/v1/reply?comment=${comment_idx}`;

    const { data } = await axios.get(url);

    return data;
  }

  async ModifyComment(comment_idx: number, content: string) {
    const url = `${server}/api/v1/comment/${comment_idx}`;
    const body = {
      content: content
    };

    const { data } = await axios.put(url, body);

    return data;
  }

  async DeleteComment(comment_idx: number) {
    const url = `${server}/api/v1/comment/${comment_idx}`;

    const { data } = await axios.delete(url);

    return data;
  }

  async CreateComment(post_idx: number, content: string, is_private?: boolean) {
    const url = `${server}/api/v1/comment`;
    const body = {
      post_idx: post_idx,
      content: content,
      is_private: is_private
    };

    const { data } = await axios.post(url, body);

    return data;
  }
  //

  async ModifyReply(reply_idx: number, content: string) {
    const url = `${server}/api/v1/reply/${reply_idx}`;
    const body = {
      content: content
    };

    const { data } = await axios.put(url, body);

    return data;
  }

  async DeleteReply(reply_idx: number) {
    const url = `${server}/api/v1/reply/${reply_idx}`;

    const { data } = await axios.delete(url);

    return data;
  }

  async CreateReply(comment_idx: number, content: string, is_private?: boolean) {
    const url = `${server}/api/v1/reply`;
    const body = {
      comment_idx: comment_idx,
      content: content,
      is_private: is_private
    };

    const { data } = await axios.post(url, body);

    return data;
  }
}

export default new Comment();
