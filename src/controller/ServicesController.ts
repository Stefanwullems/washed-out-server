import { Controller, Mutation, Authorized } from "vesper";
import Services from '../entity/Services'
import User from "../entity/User";

@Controller()
export default class ServicesController {
  constructor(
    private currentUser: User,
  ) {}


  @Authorized()
  @Mutation()
  async setServices(args) {
    const user = this.currentUser
    if(!user) {
      throw new Error("User does not exist")
    }
    const entityServices = Services.create({user})
    const servicesSet= await Services.merge(entityServices,args)

    return servicesSet
  }
   

}
