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
  commentIdx: number;

  @Column("timestampz")
  @CreateDateColumn()
  createdAt: Date;

  @Column("timestamptz")
  @UpdateDateColumn()
  updatedAt: Date;
}
