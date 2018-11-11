import { Controller, Mutation } from "vesper";
import Services from "../entity/Services";
import User from "../entity/User";
import { createQueryBuilder } from "typeorm";

@Controller()
export default class ServicesController {
  @Mutation()
  async updateServices(args) {
    const { userId, ...servicesUpdate } = args;

    const user = await User.findOne(userId);
    if (!user) throw new Error("User does not exist");

    const prevServices = await Services.findOne();

    const services = await Services.merge(prevServices, servicesUpdate).save();

    return services;
  }
}
