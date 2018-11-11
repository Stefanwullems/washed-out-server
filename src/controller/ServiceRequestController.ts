import { Controller, Mutation, Authorized } from "vesper";
import Services from "../entity/Services";
import User from "../entity/User";
import Item from "../entity/Item";
import ServiceRequest from "../entity/ServiceRequest";

@Controller()
export default class ServiceRequestController {
  @Mutation()
  async createServiceRequest(args) {
    const { fromId, toId, items, ...rest } = args;
    const from = await User.findOne(fromId);
    const to = await User.findOne(toId);

    const itemEntities = await Promise.all(
      items.map(async item => {
        return Item.create({ user: from, ...item }).save();
      })
    );

    return ServiceRequest.create({
      from,
      to,
      items: itemEntities,
      ...rest
    }).save();
  }
}
