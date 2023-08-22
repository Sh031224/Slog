import type { NextAuthConfig } from 'next-auth';
import type { Provider } from 'next-auth/providers';
import Facebook from 'next-auth/providers/facebook';
import GitHub from 'next-auth/providers/github';

const providers: Array<Provider> = [
  GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  }),
  Facebook({
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
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }

      return new URL(url).searchParams.get('callback') || baseUrl;
    }
  }
} satisfies NextAuthConfig;
