declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_URL: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;

    EMAIL_SERVER: string;
    EMAIL_FROM: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;

    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;

    DATABASE_URL: string;
  }
}
