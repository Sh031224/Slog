import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { AppDataSource } from "../data-source";

@Entity("user")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({
    length: 255,
    nullable: false
  })
  id: string = "";

  @Column({
    length: 255,
    nullable: false
  })
  name: string = "";

  @Column({
    length: 255,
    nullable: true
  })
  fcm: string | null = null;

  @Column({
    nullable: false
  })
  fcmAllow: boolean = false;

  @Column({
    nullable: false
  })
  isAdmin: boolean = false;

  @Column({
    nullable: false
  })
  isDeleted: boolean = false;

  @Column("timestampz")
  @CreateDateColumn()
  createdAt: Date = new Date();

  static async findOrCreate(id: string, name: string) {
    const userRepo = AppDataSource.getRepository(User);

    let user = await userRepo.findOne({ where: { id } });
    if (user) {
      return user;
    }
    user = new User();
    user.id = id;
    user.name = name;

    if (user.id === process.env.ADMIN_ID) {
      user.isAdmin = true;
    }

    return userRepo.save(user);
  }
}
