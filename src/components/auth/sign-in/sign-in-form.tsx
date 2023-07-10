'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { GithubIcon, FacebookIcon } from '@/components/shared/social-icons';
import { Button } from '@/components/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';
import { toast } from '@/components/shared/ui/use-toast';
import { signInSchema } from '@/lib/validators/auth';

type SignInForm = z.infer<typeof signInSchema>;

export function SignInForm() {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema)
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async ({ email }: SignInForm) => {
    setIsLoading(true);

    const result = await signIn('email', {
      email: email.toLocaleLowerCase(),
      redirect: false
    });

    setIsLoading(false);

    if (!result?.ok) {
      return toast({
        title: 'An error has occurred',
        description: 'Please try again.',
        variant: 'destructive'
      });
    }

    return toast({
      title: 'Please check your email',
      description: 'We have sent you an account login link via email.'
    });
  };

  const handleClickSocial = (provider: string) => () => {
    setIsLoading(true);

    signIn(provider);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-4/5 flex-col gap-4">
        <Form {...form}>
          <form
            className="w-full space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={isLoading}>
              Sign In
            </Button>
          </form>
        </Form>

        <div className="relative flex w-full items-center justify-center text-xs">
          <hr className="absolute z-[-1] w-full border-t" />
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={handleClickSocial('github')}
            disabled={isLoading}
          >
            <GithubIcon className="mr-2 h-4 w-4" />
            Github
          </Button>

          <Button
            type="button"
            onClick={handleClickSocial('facebook')}
            disabled={isLoading}
            className="bg-blue-700 text-secondary-foreground hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700"
          >
            <FacebookIcon className="mr-2 h-4 w-4" />
            Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}
