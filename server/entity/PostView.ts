import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import Post from "./Post";

@Entity("post_view")
export default class PostView extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false
  })
  ip: string;

  @ManyToOne((type) => Post, { onDelete: "SET NULL" })
  @JoinColumn({ name: "fk_post_idx" })
  post: Post;

  @Column({
    nullable: true
  })
  fk_post_idx: number;

  @Column("timestampz")
  @CreateDateColumn()
  created_at: Date;
}
