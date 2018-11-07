import * as jwt from "jsonwebtoken";
import { Mutation, Controller } from "vesper";
import {secret} from '../index'
import User from "../entity/User";

@Controller()
export class AuthController {
    
  @Mutation()
  async login({email,password}) {
      const user = await User.findOne({email});
      if(!user.checkPassword(password)) {
          throw new Error("Wrong password");
      }

      const token = jwt.sign({ id: user.id }, secret , { expiresIn: '4h' });
      return token;
  }
}