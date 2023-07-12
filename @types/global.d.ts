declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_URL: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;

    SENDGRID_EMAIL_FROM: string;
    SENDGRID_EMAIL_NAME: string;
    SENDGRID_API_KEY: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;

    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;

    DATABASE_URL: string;
  }
}
