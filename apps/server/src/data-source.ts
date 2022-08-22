import "dotenv/config";
import { DataSource } from "typeorm";
import User from "./models/entity/user";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: true,
  entities: [User],
  charset: "utf8mb4_unicode_ci",
  subscribers: [],
  migrations: [],
  ssl: {}
});

export default AppDataSource;
