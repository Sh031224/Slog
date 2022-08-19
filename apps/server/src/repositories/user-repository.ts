import "dotenv/config";
import { AppDataSource } from "../data-source";
import User from "../models/entity/user";
import NotFoundError from "../models/error/not-found-error";

export default class UserRepository {
  private getRepository = () => {
    return AppDataSource.getRepository(User);
  };

  findOrCreate = async (facebookId: string, name: string) => {
    const userRepository = this.getRepository();
    let user = await userRepository.findOne({ where: { facebookId, isDeleted: false } });

    // find
    if (user) {
      return user;
    }

    // create
    user = new User();
    user.facebookId = facebookId;
    user.name = name;

    if (user.facebookId === process.env.ADMIN_FACEBOOK_ID) {
      user.isAdmin = true;
    }

    return userRepository.save(user);
  };

  findOneByIdxAndFacebookId = async (idx: number, facebookId: string) => {
    const userRepository = this.getRepository();

    const user = await userRepository.findOne({ where: { idx, facebookId, isDeleted: false } });

    if (!user) throw new NotFoundError("user is not found");

    return user;
  };

  save = async (user: User) => {
    const userRepository = this.getRepository();

    return userRepository.save(user);
  };
}
