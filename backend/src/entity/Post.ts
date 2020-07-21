import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import Category from "./Category";

@Entity("post")
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false
  })
  title: string;

  @Column({
    length: 255,
    nullable: false
  })
  description: string;

  @Column("text", {
    nullable: false
  })
  content: string;

  @Column({
    nullable: false,
    default: 0
  })
  view: number;

  @Column({
    nullable: false,
    default: false
  })
  is_temp: boolean;

  @ManyToOne((type) => Category, { onDelete: "SET NULL" })
  @JoinColumn({ name: "fk_category_idx" })
  category: Category;

  @Column({
    nullable: true
  })
  fk_category_idx: number;

  @Column({
    length: 1000,
    nullable: true
  })
  thumbnail: string;

  @Column("timestampz")
  @CreateDateColumn()
  created_at: Date;

  @Column("timestampz")
  @CreateDateColumn()
  updated_at: Date;
}
