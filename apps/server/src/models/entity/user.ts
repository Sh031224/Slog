import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { AppDataSource } from "../../data-source";

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

  static async findOrCreate(id: string, name: string) {
    const userRepo = AppDataSource.getRepository(User);

    let user = await userRepo.findOne({ where: { facebookId: id } });
    if (user) {
      return user;
    }
    user = new User();
    user.facebookId = id;
    user.name = name;

    if (user.facebookId === process.env.ADMIN_ID) {
      user.isAdmin = true;
    }

    return userRepo.save(user);
  }
}
