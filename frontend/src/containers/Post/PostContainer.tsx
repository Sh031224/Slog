import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import PostStore from "../../stores/PostStore";

interface PostContainerProps extends RouteComponentProps<MatchType> {
  store?: StoreType;
}

interface StoreType {
  PostStore: PostStore;
}

interface MatchType {
  idx: string;
}

const PostContainer = ({ match, store }: PostContainerProps) => {
  const history = useHistory();
  const { idx } = match.params;

  const { getPostInfo, handlePosts, posts } = store!.PostStore;

  useEffect(() => {
    getPostInfo(Number(idx))
      .then((res: any) => {
        console.log(res);
      })
      .catch(() => {
        alert("해당 게시글이 없습니다.");
        history.push("/");
      });
  }, []);

  return (
    <>
      <div></div>
    </>
  );
};

export default inject("store")(observer(withRouter(PostContainer)));
