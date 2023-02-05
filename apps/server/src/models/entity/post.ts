import type { Nullable } from "@slog/types";
import { PostType } from "@slog/types";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

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

  @Column("varchar", {
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

  @Column({
    nullable: false
  })
  categoryIdx: number;

  @Column("varchar", {
    length: 300,
    nullable: true
  })
  thumbnail: Nullable<string>;

  @Column("timestampz")
  @CreateDateColumn()
  /* istanbul ignore next */
  createdAt: Date;

  @Column("timestampz")
  @CreateDateColumn()
  /* istanbul ignore next */
  updatedAt: Date;
}
