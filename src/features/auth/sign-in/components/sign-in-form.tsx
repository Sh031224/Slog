'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { FacebookIcon } from '@/shared/components/icons/facebook-icon';
import { GithubIcon } from '@/shared/components/icons/github-icon';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { toast } from '@/shared/components/ui/use-toast';

import { signInSchema } from '../validators/auth';

type SignInForm = z.infer<typeof signInSchema>;

export function SignInForm() {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema)
  });

  const [isLoading, setIsLoading] = React.useState({
    email: false,
    github: false,
    facebook: false
  });

  const searchParams = useSearchParams();

  const callbackUrl = searchParams?.get('from') || '/';

  const onSubmit = async ({ email }: SignInForm) => {
    setIsLoading(prev => ({ ...prev, email: true }));

    const result = await signIn('email', {
      email: email.toLocaleLowerCase(),
      redirect: false,
      callbackUrl
    });

    setIsLoading(prev => ({ ...prev, email: false }));

    if (!!result?.error) {
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
    setIsLoading(prev => ({ ...prev, [provider]: true }));

    signIn(provider, {
      redirect: false,
      callbackUrl
    });
  };

  const disabled = isLoading.email || isLoading.github || isLoading.facebook;

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
                      disabled={disabled}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={disabled}>
              {isLoading.email && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
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
            disabled={disabled}
          >
            {isLoading.github ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GithubIcon className="mr-2 h-4 w-4" />
            )}
            Github
          </Button>

          <Button
            type="button"
            onClick={handleClickSocial('facebook')}
            disabled={disabled}
            className="bg-blue-700 text-primary-foreground hover:bg-blue-600 dark:bg-blue-800 dark:text-secondary-foreground dark:hover:bg-blue-700"
          >
            {isLoading.facebook ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FacebookIcon className="mr-2 h-4 w-4" />
            )}
            Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}
