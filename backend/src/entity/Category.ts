import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("category")
export default class Category extends BaseEntity {
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
  order_number: number;
}
