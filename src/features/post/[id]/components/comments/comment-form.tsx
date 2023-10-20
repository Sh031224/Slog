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

import type { CommentHandlerParams } from '../../types';
import { commentSchema } from '../../validators/comment';

type Props = {
  defaultValues?: CommentForm;
  user: Pick<User, 'name' | 'id' | 'image'> | undefined;
  onSubmit: (params: CommentHandlerParams) => Promise<void>;
  onCancel?: () => void;
};

type CommentForm = z.infer<typeof commentSchema>;

export default function CommentForm({
  defaultValues,
  user,
  onCancel,
  onSubmit
}: Props) {
  const form = useForm<CommentForm>({
    resolver: zodResolver(commentSchema),
    defaultValues
  });
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = isLoading || !user;

  const onSubmitHandler = async ({ content, isPrivate }: CommentForm) => {
    try {
      setIsLoading(true);

      await onSubmit({
        content: content.trim().replace(/\n$/gm, ''),
        isPrivate: isPrivate as boolean
      });

      form.reset({ content: '', isPrivate: false });
      onCancel?.();
    } catch (err) {
      toast({
        title: '오류가 발생했습니다.',
        description: '조금 후에 다시 시도해 주세요.',
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
        onSubmit={form.handleSubmit(onSubmitHandler)}
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
                        ? '댓글을 작성하세요 !'
                        : '로그인 이후 작성 가능합니다.'
                    }
                    disabled={!user}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-fit items-center gap-4 self-end">
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
                    비밀 댓글로 작성하기
                  </FormLabel>
                </FormItem>
              )}
            />

            {!!onCancel && (
              <Button variant="secondary" type="reset" onClick={onCancel}>
                취소
              </Button>
            )}

            <Button type="submit" disabled={isDisabled}>
              제출
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
