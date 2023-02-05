import "dotenv/config";
import { DataSource } from "typeorm";

import Category from "./models/entity/category";
import Comment from "./models/entity/comment";
import Post from "./models/entity/post";
import PostView from "./models/entity/postView";
import User from "./models/entity/user";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: false,
  entities: [User, Category, Post, PostView, Comment],
  charset: "utf8mb4_unicode_ci",
  subscribers: [],
  migrations: [],
  ssl: {}
});

export default AppDataSource;
