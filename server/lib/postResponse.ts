import axios, { AxiosResponse } from "axios";
import { IPost } from "interface/IPost";
import { GetPostsResponse } from "interface/IResponse";

const SERVER = require("../../src/config/server.json").server;

const postResponse = async (limit?: number): Promise<IPost[]> => {
  const { data }: AxiosResponse<GetPostsResponse> = await axios.get(
    `${SERVER}/api/v1/post?page=1&limit=${limit || 1000000}`
  );

  return data.data.posts;
};

export default postResponse;
