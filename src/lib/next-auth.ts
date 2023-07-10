import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { database } from './database';

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(database),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials);
      return true;
    }
  }
};
