import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import PostList from "../../assets/api/PostList";

interface PostParmsType {
  page: number;
  limit: number;
  order?: string;
  category?: number;
}

@autobind
class AirQualityStore {
  @observable posts = [];
  @observable post_count = 0;

  @action
  handleAirQuality = async (query: PostParmsType) => {
    try {
      const response = await PostList.GetPostList(query);
      this.posts = response.data.posts;
      this.post_count = response.data.count;
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

export default AirQualityStore;
