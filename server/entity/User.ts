import {
  Entity,
  Column,
  BaseEntity,
  getRepository,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn,
  CreateDateColumn
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

  @Column({
    length: 255,
    nullable: false
  })
  name: string;

  @Column({
    length: 255,
    nullable: true
  })
  fcm: string;

  @Column({
    default: false,
    nullable: false
  })
  fcm_allow: boolean;

  @Column({
    default: false,
    nullable: false
  })
  is_admin: boolean;

  @Column({
    default: false,
    nullable: false
  })
  is_deleted: boolean;

  @Column("timestampz")
  @CreateDateColumn()
  created_at: Date;

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany((type) => Reply, (reply) => reply.user)
  replies: Reply[];

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
