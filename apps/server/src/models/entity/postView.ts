import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("postView")
export default class PostView {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false
  })
  ip: string;

  @Column({
    nullable: true
  })
  postIdx: number;

  @Column("timestampz")
  @CreateDateColumn()
  createdAt: Date;
}
