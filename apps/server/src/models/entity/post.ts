import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Nullable, PostType } from "shared-types";

import Category from "./category";

@Entity("post")
export default class Post {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false
  })
  title: string;

  @Column({
    length: 255,
    nullable: true
  })
  description: string;

  @Column("text", {
    nullable: true
  })
  content: Nullable<string>;

  @Column({
    type: "enum",
    enum: PostType,
    default: PostType.DEFAULT,
    nullable: false
  })
  type: PostType;

  @Column({
    nullable: true
  })
  externalUrl: Nullable<string>;

  @Column({
    nullable: false,
    default: 0
  })
  view: number;

  @Column({
    nullable: false,
    default: false
  })
  isTemp: boolean;

  @ManyToOne(/* istanbul ignore next */ () => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: "categoryIdx" })
  category: Category;

  @Column({
    nullable: false
  })
  categoryIdx: number;

  @Column({
    length: 300,
    nullable: true
  })
  thumbnail: Nullable<string>;

  @Column("timestampz")
  @CreateDateColumn()
  createdAt: Date;

  @Column("timestampz")
  @CreateDateColumn()
  updatedAt: Date;
}
