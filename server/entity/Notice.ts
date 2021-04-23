import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn
} from "typeorm";

@Entity("notice")
export default class Notice extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false
  })
  title: string;

  @Column("text")
  content: string;

  @Column("timestampz")
  @CreateDateColumn()
  created_at: Date;
}
