import { Controller, Query, Mutation } from "vesper";
// import * as jsonwebtoken from 'jsonwebtoken'
import User from "../entity/User";

@Controller()
export default class UserController {
  @Query()
  allUser() {
    return User.find();
  }

  @Mutation()
  async signUp(args) {
    const {password,...rest} = args
    const entity = User.create(rest)
    await entity.setPassword(password)
    const user = await entity.save()

    return user
   

    // return json web token
    // return jsonwebtoken.sign(
    //   { id: user.id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1y' }
    // )
  }

}

// async function hashPassword(rawPassword: string) {
//   const salt = await bcrypt.genSalt(10)
//   const hash = await bcrypt.hash(rawPassword, salt)
//   return {hash, salt}
// }