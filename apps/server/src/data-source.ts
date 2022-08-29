import "dotenv/config";
import { DataSource } from "typeorm";
import Category from "./models/entity/category";
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
  entities: [User, Category],
  charset: "utf8mb4_unicode_ci",
  subscribers: [],
  migrations: [],
  ssl: {}
});

export default AppDataSource;
