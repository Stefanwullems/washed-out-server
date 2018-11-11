import { Controller, Mutation } from "vesper";
import Services from "../entity/Services";
import User from "../entity/User";

@Controller()
export default class ServicesController {
  @Mutation()
  async setServices(args) {
    const { id, ...servicesUpdate } = args;

    const user = await User.findOne(id);
    if (!user) throw new Error("User does not exist");

    const prevServices = await Services.findOne({ where: { user } });
    const services = await Services.merge(prevServices, servicesUpdate).save();

    return (await User.merge(user, { services }).save()).services;
  }
}
