import React from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import TimeCounting from "time-counting";
import { useRouter } from "next/router";
import "./PostHitItem.scss";

const styled = require("./PostHitItem.scss");

const cx = classNames.bind(styled);

interface PostHitItemProps {
  post: PostType;
}

interface PostType {
  idx: number;
  title: string;
  view?: number;
  comment_count?: number;
  thumbnail?: string;
  description?: string;
  created_at: Date;
}

const PostHitItem = ({ post }: PostHitItemProps) => {
  const router = useRouter();

  return (
    <div className="post-hit-item">
      <Link href={`/post/${post.idx}`}>
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
