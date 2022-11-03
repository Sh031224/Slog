import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import Post from "./post";

@Entity("postView")
export default class PostView {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false
  })
  ip: string;

  @ManyToOne(/* istanbul ignore next */ () => Post, { onDelete: "SET NULL" })
  @JoinColumn({ name: "postIdx" })
  post: Post;

  @Column({
    nullable: true
  })
  postIdx: number;

  @Column("timestampz")
  @CreateDateColumn()
  createdAt: Date;
}
