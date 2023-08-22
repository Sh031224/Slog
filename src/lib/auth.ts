import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Email from 'next-auth/providers/email';

import authConfig from '@/auth.config';

import { prisma } from './database';
import { signInTemplate, signUpTemplate } from './templates/mail';

// To use an email provider, a database adapter is required,
// so push it to the provider in the configuration that includes the database.
authConfig.providers.push(
  Email({
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
  }) as ValueOfIterable<NextAuthConfig['providers']>
);

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental // will be removed in future
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  ...authConfig
});
