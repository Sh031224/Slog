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
import Comment from "./Comment";

@Entity("reply")
export default class Reply extends BaseEntity {
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

  @ManyToOne((type) => User, (user) => user.replies, { onDelete: "SET NULL" })
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

  @ManyToOne((type) => Comment, { onDelete: "CASCADE" })
  @JoinColumn({ name: "fk_comment_idx" })
  comment: Comment;

  @Column({
    nullable: false
  })
  fk_comment_idx: number;

  @Column("timestampz")
  @CreateDateColumn()
  created_at: Date;

  @Column("timestamptz")
  @UpdateDateColumn()
  updated_at: Date;
}
