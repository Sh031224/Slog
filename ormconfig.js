module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  synchronize: true,
  logging: false,
  entities: ["server/entity/**/*.ts"],
  migrations: ["server/migration/**/*.ts"],
  subscribers: ["server/subscriber/**/*.ts"],
  charset: "utf8mb4_unicode_ci",
  cli: {
    entitiesDir: "server/entity",
    migrationsDir: "server/migration",
    subscribersDir: "server/subscriber"
  }
};
