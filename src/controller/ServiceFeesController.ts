import { Controller, Mutation } from "vesper";
import ServiceFees from "../entity/ServiceFees";

@Controller()
export default class ServiceFeesController {
  @Mutation()
  async updateServiceFees(args) {
    const { id, serviceFees } = args;

    const prevServices = await ServiceFees.findOne(id);

    return await ServiceFees.merge(prevServices, serviceFees).save();
  }
}
