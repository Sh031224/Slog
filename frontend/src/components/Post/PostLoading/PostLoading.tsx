import React from "react";
import "./PostLoading.scss";

const PostLoading = () => {
  return (
    <div className="post-loading">
      <div className="post-loading-title" />
      <div className="post-loading-date" />
      <div className="post-loading-img" />
      <div className="post-loading-content post-loading-content-1" />
      <div className="post-loading-content post-loading-content-2" />
    </div>
  );
};

export default PostLoading;
