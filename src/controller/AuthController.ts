import * as jwt from "jsonwebtoken";
import { Mutation, Controller } from "vesper";
import { secret } from "../index";
import User from "../entity/User";

@Controller()
export default class AuthController {
  @Mutation()
  async login({ email, password }) {
    const user = await User.findOne({ where: { email } });
    if (await user.passwordMatches(password)) {
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

      return { ...user, token };
    }
  }
}
