import React from "react";
import MainTemplate from "../components/common/Template/MainTemplate";
import PostContainer from "../containers/Post/PostContainer";

const PostPage = () => {
  return (
    <MainTemplate>
      <PostContainer />
    </MainTemplate>
  );
};

export default PostPage;
