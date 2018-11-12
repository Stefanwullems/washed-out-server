import { Controller, Mutation } from "vesper";
import Services from "../entity/Services";

@Controller()
export default class ServicesController {
  @Mutation()
  async updateServices(args) {
    const { id, ...servicesUpdate } = args;

    const prevServices = await Services.findOne(id);

    const services = await Services.merge(prevServices, servicesUpdate).save();

    return services;
  }
}
