import type { Metadata } from 'next';

import SignIn from '@/features/(auth)/sign-in';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
  robots: 'noindex'
};

export default function SignInPage() {
  return <SignIn />;
}
