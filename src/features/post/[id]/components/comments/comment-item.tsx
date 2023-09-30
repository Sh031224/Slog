'use client';
import type { User } from '@prisma/client';
import dayjs from 'dayjs';
import { LockIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';

import { prettyFormatter } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/shared/components/ui/alert-dialog';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';

import CommentForm from './comment-form';
import { checkHideComment, checkOwnComment } from '../../helpers';
import type { CommentHandlerParams } from '../../types';

type Props = {
  comment: {
    id: number;
    content: string;
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: {
      id: string;
      name: string | null;
      image: string | null;
      isAdmin: boolean;
    };
  };
  user?: Pick<User, 'id' | 'isAdmin' | 'name' | 'image'>;
  postId: number;
  createAction?: (params: CommentHandlerParams) => Promise<void>;
  deleteAction: (id: number, postId: number) => Promise<void>;
  updateAction: (params: CommentHandlerParams) => Promise<void>;
};

export default function CommentItem({
  comment,
  user,
  postId,
  createAction,
  updateAction,
  deleteAction
}: Props) {
  const shouldHideComment = checkHideComment({ comment, user });
  const isOwnComment = checkOwnComment({ comment, user });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const handleDeleteComment = async () => {
    if (user?.id !== comment.user.id && !user?.isAdmin) {
      return;
    }

    return deleteAction(comment.id, postId);
  };

  return (
    <>
      {isEditMode ? (
        <CommentForm
          defaultValues={{
            content: comment.content,
            isPrivate: comment.isPrivate
          }}
          user={user}
          onCancel={() => setIsEditMode(false)}
          onSubmit={updateAction}
        />
      ) : (
        <div className="flex w-full gap-4">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
            {comment.user.image && !shouldHideComment ? (
              <AvatarImage
                src={comment.user.image}
                alt={comment.user.name || 'profile'}
              />
            ) : (
              <AvatarFallback>
                <span className="sr-only">
                  {shouldHideComment ? 'Anonymous' : comment.user.name}
                </span>
                <UserIcon className="h-4 w-4 sm:h-6 sm:w-6" />
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex w-full flex-col">
            {shouldHideComment ? (
              <p className="mt-1 whitespace-pre-wrap text-base leading-7 sm:mt-2">
                This is private content.
              </p>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium leading-7">
                    {comment.user.name}
                  </span>

                  {comment.isPrivate && (
                    <LockIcon
                      aria-label="private content"
                      className="h-4 w-4"
                    />
                  )}

                  <span className="text-sm text-muted-foreground">
                    {prettyFormatter(comment.createdAt)}

                    {dayjs(comment.createdAt).diff(comment.updatedAt) > 0 && (
                      <span title={comment.updatedAt.toString()}>(수정됨)</span>
                    )}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-base leading-7">
                  {comment.content}
                </p>

                {!shouldHideComment && (
                  <div className="flex gap-4">
                    {!!createAction && (
                      <Button
                        onClick={() => setIsCreateMode(true)}
                        variant="link"
                        className="p-0 text-sm leading-7 text-muted-foreground"
                      >
                        Reply
                      </Button>
                    )}

                    {isOwnComment && (
                      <Button
                        onClick={() => setIsEditMode(true)}
                        variant="link"
                        className="p-0 text-sm leading-7 text-muted-foreground"
                      >
                        Edit
                      </Button>
                    )}
                    {isOwnComment && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="link"
                            className="p-0 text-sm leading-7 text-muted-foreground"
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Deleted comments cannot be restored.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteComment}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                )}
              </>
            )}

            {isCreateMode && !!createAction && (
              <div className="mt-2">
                <CommentForm
                  defaultValues={{
                    content: '',
                    isPrivate: comment.isPrivate
                  }}
                  user={user}
                  onCancel={() => setIsCreateMode(false)}
                  onSubmit={createAction}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
