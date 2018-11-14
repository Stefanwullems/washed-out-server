import { Controller, Subscription, Mutation } from "vesper";
import { EntityManager } from "typeorm";
import { PubSub } from "graphql-subscriptions";
import Message from "../entity/Message";
import User from "../entity/User";

@Controller()
export class MessageController {
  constructor(private entityManager: EntityManager, private pubSub: PubSub) {}

  @Subscription()
  messageSent({ messageSent }, args) {
    return messageSent.receiver === args.userId;
  }

  @Mutation()
  async messageSave(args) {
    const { fromId, toId, content } = args;
    const from = await User.findOne(fromId);
    const to = await User.findOne(toId);
    const message = await Message.create({
      from,
      to,
      content
    });
    this.pubSub.publish("messageSent", { messageSent: message });
    return message;
  }
}
