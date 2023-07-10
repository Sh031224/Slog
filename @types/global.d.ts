declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
  }
}
