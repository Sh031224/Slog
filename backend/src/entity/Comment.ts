import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";
import Post from "./Post";

@Entity("comment")
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column("text", {
    nullable: false
  })
  content: string;

  @Column({
    nullable: false,
    default: 0
  })
  replies_count: number;

  @Column({
    default: false,
    nullable: false
  })
  is_private: boolean;

  @ManyToOne((type) => User, (user) => user.comments, { onDelete: "SET NULL" })
  @JoinColumn([
    { name: "fk_user_idx", referencedColumnName: "idx" },
    { name: "fk_user_name", referencedColumnName: "name" }
  ])
  user: User;

  @Column({
    nullable: true
  })
  fk_user_idx: number;

  @Column({
    nullable: true
  })
  fk_user_name: string;

  @ManyToOne((type) => Post, { onDelete: "CASCADE" })
  @JoinColumn({ name: "fk_post_idx" })
  post: Post;

  @Column({
    nullable: true
  })
  fk_post_idx: number;

  @Column("timestampz")
  @CreateDateColumn()
  created_at: Date;

  @Column("timestamptz")
  @UpdateDateColumn()
  updated_at: Date;
}
