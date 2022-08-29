import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("category")
export default class Category {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 40,
    nullable: false
  })
  name: string;

  @Column({
    nullable: false
  })
  orderNumber: number;

  @Column("timestampz")
  @CreateDateColumn()
  createdAt: Date;
}
