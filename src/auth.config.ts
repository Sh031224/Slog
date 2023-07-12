import type { Provider } from '@auth/core/providers';
import type { NextAuthConfig } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';

const providers: Array<Provider> = [
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  }),
  FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
  })
];

export default {
  providers,
  pages: {
    signIn: '/sign-in'
  },
  callbacks: {
    authorized() {
      return true;
    },
    async jwt({ user, token }) {
      if (user) {
        return {
          id: user.id,
          image: user.image,
          name: user.name,
          email: user.email
        };
      }

      return token;
    }
  }
} satisfies NextAuthConfig;
