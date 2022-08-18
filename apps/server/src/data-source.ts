import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  entities: ["./entity/**/*.ts"],
  charset: "utf8mb4_unicode_ci",
  subscribers: [],
  migrations: []
});
