import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity("user")
export default class User extends BaseEntity {
  @PrimaryColumn({
    length: 255,
    nullable: false
  })
  email: string;

  @Column({
    length: 255,
    nullable: false
  })
  name: string;

  @Column({
    default: false,
    nullable: false
  })
  is_admin: boolean;
}
