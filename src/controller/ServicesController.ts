import { Controller, Mutation, Authorized } from "vesper";
import User from "../entity/User";


@Controller()
export default class ServicesController {
  constructor(
    private currentUser?: CurrentUser
  ) {}


  @Authorized()
  @Mutation()
  async setServices(args) {
    const user =this.currentUser
    const entity = Service.create({user})
    await entity.setPassword(password)


    return user
  }
   

}
