import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false
  })
  facebookId: string;

  @Column({
    length: 255,
    nullable: false
  })
  name: string;

  @Column({
    length: 255,
    nullable: true
  })
  fcmToken: string;

  @Column({
    nullable: false,
    default: false
  })
  isAdmin: boolean;

  @Column({
    nullable: false,
    default: false
  })
  isDeleted: boolean;

  @Column("timestampz")
  @CreateDateColumn()
  createdAt: Date;
}
