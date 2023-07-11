import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
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
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user: callbackUser }) {
      const user = await database.user.findFirst({
        where: {
          email: token.email
        }
      });

      if (!user) {
        if (callbackUser) {
          token.id = callbackUser.id;
        }

        return token;
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.image
      };
    }
  }
};
