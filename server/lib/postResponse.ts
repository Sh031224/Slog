import axios, { AxiosResponse } from "axios";
import { Post } from "types/post";
import { GetPostsResponse } from "types/response";

const postResponse = async (limit?: number): Promise<Post[]> => {
  const { data }: AxiosResponse<GetPostsResponse> = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/post?page=1&limit=${limit || 1000000}`
  );

  return data.data.posts;
};

export default postResponse;
