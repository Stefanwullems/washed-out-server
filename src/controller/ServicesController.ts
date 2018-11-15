import { Controller, Mutation, Authorized } from "vesper";
import OfferedServices from "../entity/OfferedServices";

@Controller()
export default class ServicesController {
  @Authorized()
  @Mutation()
  async updateServices(args) {
    const { id, services } = args;

    const prevServices = await OfferedServices.findOne(id);

    return await OfferedServices.merge(prevServices, services).save();
  }
}
