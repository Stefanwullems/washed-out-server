import { Controller, Query, Mutation, Authorized } from "vesper";
import User from "../entity/User";
import OfferedServices from "../entity/OfferedServices";
import ServiceFees from "../entity/ServiceFees";

@Controller()
export default class UserController {
  @Query()
  allUsers() {
    return User.find();
  }

  @Query()
  async getFeed({ userId }) {
    return (await User.find()).filter(
      user =>
        user.id !== userId &&
        (user.services.washing ||
          user.services.drying ||
          user.services.ironing ||
          user.services.folding ||
          user.services.delivery ||
          user.services.pickup) &&
        user.status === "Available"
    );
  }

  @Query()
  getUser({ userId }) {
    return User.findOne(userId);
  }

  @Mutation()
  async signUp(args) {
    const { password, ...rest } = args;
    const services = await OfferedServices.create().save();
    const serviceFees = await ServiceFees.create().save();

    const entity = User.create({ ...rest, services, serviceFees });
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
