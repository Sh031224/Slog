'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@prisma/client';
import { UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/shared/components/ui/form';
import { Textarea } from '@/shared/components/ui/textarea';
import { toast } from '@/shared/components/ui/use-toast';

import type { CreateCommentParams } from '../../types';
import { commentSchema } from '../../validators/comment';

type Props = {
  postId: number;
  user: Pick<User, 'name' | 'id' | 'image'> | undefined;
  createComment: (
    params: CreateCommentParams,
    userId?: string
  ) => Promise<void>;
};

type CommentForm = z.infer<typeof commentSchema>;

export default function CommentForm({ postId, user, createComment }: Props) {
  const form = useForm<CommentForm>({ resolver: zodResolver(commentSchema) });
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = isLoading || !user;

  const onSubmit = async ({ content, isPrivate }: CommentForm) => {
    try {
      setIsLoading(true);

      await createComment(
        { content, isPrivate: isPrivate as boolean, postId },
        user?.id
      );

      form.reset();
    } catch (err) {
      toast({
        title: 'An error occurred.',
        description: 'Please try again in a few minutes.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full gap-4"
        aria-label="create comment"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
          {user?.image ? (
            <AvatarImage src={user.image} alt={user.name || 'profile'} />
          ) : (
            <AvatarFallback>
              <span className="sr-only">{user?.name || 'Anonymous'}</span>
              <UserIcon className="h-4 w-4 sm:h-6 sm:w-6" />
            </AvatarFallback>
          )}
        </Avatar>

        <div className="flex w-full flex-col gap-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    className="min-h-[100px] resize-none"
                    placeholder={
                      user
                        ? 'What are your thoughts?'
                        : 'You can write after sign in.'
                    }
                    disabled={!user}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-fit items-center gap-8 self-end">
            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="flex h-fit space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      disabled={!user}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Visible only to admin and commenter
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isDisabled}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
