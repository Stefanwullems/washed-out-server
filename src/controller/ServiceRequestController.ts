import { Controller, Mutation, Authorized } from "vesper";
import User from "../entity/User";
import Item from "../entity/Item";
import ServiceRequest from "../entity/ServiceRequest";
import RequestedServices from "../entity/RequestedServices";

@Controller()
export default class ServiceRequestController {
  @Authorized()
  @Mutation()
  async createServiceRequest(args) {
    const { fromId, toId, items, services, ...rest } = args;

    const from = await User.findOne(fromId);

    const itemEntities = await Promise.all(
      items.map(async item => {
        return Item.create({ user: from, ...item }).save();
      })
    );

    return ServiceRequest.create({
      from,
      to: await User.findOne(toId),
      services: await RequestedServices.create(services).save(),
      items: itemEntities,
      ...rest
    }).save();
  }
}
