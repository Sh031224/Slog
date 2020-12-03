import React from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import TimeCounting from "time-counting";
import { useRouter } from "next/router";
import "./PostHitItem.scss";
import { PostType } from "types/PostType";

const styled = require("./PostHitItem.scss");

const cx = classNames.bind(styled);

interface PostHitItemProps {
  post: PostType;
}

const PostHitItem = ({ post }: PostHitItemProps) => {
  const router = useRouter();

  return (
    <div className="post-hit-item">
      <Link href={`/post/[idx]`} as={`/post/${post.idx}`}>
        <a
          className={cx({
            "post-hit-item-active": router.query.idx === `${post.idx}`
          })}
        >
          <div className="post-hit-item-title">{post.title}</div>
        </a>
      </Link>
      <div className="post-hit-item-date">
        {TimeCounting(post.created_at, { lang: "ko" })}
      </div>
    </div>
  );
};

export default PostHitItem;
