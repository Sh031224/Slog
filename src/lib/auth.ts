import { PrismaAdapter } from '@auth/prisma-adapter';
import type { User } from 'next-auth';
import NextAuth from 'next-auth';
import Facebook from 'next-auth/providers/facebook';
import GitHub from 'next-auth/providers/github';

import { prisma } from './database';
import { signInTemplate, signUpTemplate } from './templates/mail';

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental // will be removed in future
} = NextAuth({
  providers: [
    {
      id: 'sendgrid',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      type: 'email',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      async sendVerificationRequest({ identifier, url }) {
        const user = await prisma.user.findUnique({
          where: {
            email: identifier
          },
          select: {
            emailVerified: true
          }
        });

        const isVerified = !!user?.emailVerified;

        const template = isVerified ? signInTemplate(url) : signUpTemplate(url);

        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: identifier }] }],
            from: {
              email: process.env.SENDGRID_EMAIL_FROM,
              name: process.env.SENDGRID_EMAIL_NAME
            },
            subject: isVerified
              ? "Sign in to 'Slog'"
              : "Create Account in 'Slog'",
            content: [
              {
                type: 'text/html',
                value: template
              }
            ]
          })
        });

        if (!response.ok) {
          const { errors } = await response.json();
          throw new Error(JSON.stringify(errors));
        }
      }
    },
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
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
          name: user.name,
          email: user.email,
          image: user.image,
          isAdmin: user.isAdmin
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token as Required<User>;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }

      return new URL(url).searchParams.get('callback') || baseUrl;
    }
  }
});
