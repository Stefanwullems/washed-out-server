import { Controller, Query, Mutation } from "vesper";
import User from "../entity/User";

@Controller()
export default class UserController {
  @Query()
  allUsers() {
    return User.find();
  }

  @Mutation()
  async signUp(args) {
    console.log(args);
    const { password, ...rest } = args;
    const entity = User.create(rest);
    await entity.setPassword(password);
    const user = await entity.save();
    return user;
  }
}
