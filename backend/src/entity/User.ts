import {
  Entity,
  Column,
  BaseEntity,
  getRepository,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn
} from "typeorm";
import Comment from "./Comment";
import Reply from "./Reply";

@Entity("user")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false
  })
  id: string;

  @PrimaryColumn({
    length: 255,
    nullable: false
  })
  name: string;

  @Column({
    default: false,
    nullable: false
  })
  is_admin: boolean;

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany((type) => Reply, (reply) => reply.user)
  replys: Reply[];

  static async findOrCreate(id: string, name: string) {
    const userRepo = getRepository(User);

    let user = await userRepo.findOne({ id: id });
    if (user) {
      return user;
    }
    user = new User();
    user.id = id;
    user.name = name;

    if (user.id === process.env.ADMIN_ID) {
      user.is_admin = true;
    }

    return userRepo.save(user);
  }
}
