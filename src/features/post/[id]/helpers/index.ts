type Params = {
  comment: {
    isPrivate: boolean;
    user: {
      id: string;
      name: string | null;
      image: string | null;
      isAdmin: boolean;
    } | null;
  };
  user?: {
    id: string;
    isAdmin: boolean;
  };
};

export function checkOwnComment({ comment, user }: Params) {
  return comment.user?.id === user?.id;
}

export function checkHideComment({ comment, user }: Params) {
  if (!comment.isPrivate) {
    return false;
  }

  if (!user) {
    return true;
  }

  if (user.isAdmin) {
    return false;
  }

  return !checkOwnComment({ comment, user });
}
