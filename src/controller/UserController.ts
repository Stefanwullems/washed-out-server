import { Controller, Query, Mutation } from "vesper";
import User from "../entity/User";
import Services from "../entity/Services";

@Controller()
export default class UserController {
  @Query()
  allUsers() {
    return User.find();
  }

  @Mutation()
  async signUp(args) {
    const { password, ...rest } = args;
    const services = await Services.create().save();

    const entity = User.create({ ...rest, services });
    await entity.setPassword(password);
    return entity.save();
  }

  @Mutation()
  async updateProfile(args) {
    const { userId, ...update } = args;
    const user = await User.findOne(userId);
    return User.merge(user, update).save();
  }
}
