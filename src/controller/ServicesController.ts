import { Controller, Mutation, Authorized } from "vesper";
import User from "../entity/User";

@Controller()
export default class ServicesController {
  constructor(
    private currentUser?: CurrentUser,
  ) {}


  @Authorized()
  @Mutation()
  async setServices(args) {
    const {password,...rest} = args
    const entity = User.create(rest)
    await entity.setPassword(password)
    const user = await entity.save()

    return user
  }
   

}
