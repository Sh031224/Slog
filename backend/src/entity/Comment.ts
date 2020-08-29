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
    default: false,
    nullable: false
  })
  is_private: boolean;

  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn([{ name: "fk_user_idx", referencedColumnName: "idx" }])
  user: User;

  @Column({
    nullable: false
  })
  fk_user_idx: number;

  @Column({
    length: 255,
    nullable: false
  })
  fk_user_name: string;

  @Column({
    default: false,
    nullable: false
  })
  fk_user_is_deleted: boolean;

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
