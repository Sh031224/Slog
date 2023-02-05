import type { Nullable } from "@slog/types";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("comment")
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column("text", {
    nullable: false
  })
  content: string;

  @Column({
    default: false,
    nullable: false
  })
  isPrivate: boolean;

  @Column({
    nullable: false
  })
  userIdx: number;

  @Column({
    nullable: false
  })
  postIdx: number;

  @Column({
    type: "int",
    nullable: true
  })
  parentIdx: Nullable<number>;

  @Column("timestampz")
  @CreateDateColumn()
  /* istanbul ignore next */
  createdAt: Date;

  @Column("timestamptz")
  @UpdateDateColumn()
  /* istanbul ignore next */
  updatedAt: Date;
}
