import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import { createTransport } from 'nodemailer';

import { database } from './database';
import { signInTemplate, signUpTemplate } from './templates/mail';

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(database),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await database.user.findUnique({
          where: {
            email: identifier
          },
          select: {
            emailVerified: true
          }
        });

        const isVerified = user?.emailVerified;

        const template = isVerified ? signInTemplate(url) : signUpTemplate(url);

        const transport = createTransport(provider.server);

        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: isVerified
            ? "'Sign in to 'Slog'"
            : "'Create Account in 'Slog'",
          html: template
        });

        const failed = result.rejected.concat(result.pending).filter(Boolean);

        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
        }
      }
    }),
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
