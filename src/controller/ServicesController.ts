import { Controller, Mutation, Authorized } from "vesper";
import Services from "../entity/Services";
import User from "../entity/User";

@Controller()
export default class ServicesController {
  constructor(private currentUser: User) {}

  // @Authorized()
  @Mutation()
  async setServices(args) {
    const { id, ...services } = args;
    //const user = this.currentUser;
    const user = await User.findOne(id);
    if (!user) {
      throw new Error("User does not exist");
    }
    const prevServices = await Services.findOne({ where: { user } });
    return (await User.merge(user, {
      services: await Services.merge(prevServices, services).save()
    }).save()).services;
  }
}
