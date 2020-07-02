import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  getRepository
} from "typeorm";

@Entity("user")
export default class User extends BaseEntity {
  @PrimaryColumn({
    length: 255,
    nullable: false
  })
  id: string;

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

  static async findOrCreate(id: string, name: string) {
    const userRepo = getRepository(User);

    let user = await userRepo.findOne({ id: id });
    if (user) {
      return user;
    }
    user = new User();
    user.id = id;
    user.name = name;

    return userRepo.save(user);
  }
}
