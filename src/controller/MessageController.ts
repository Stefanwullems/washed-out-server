import { Controller, Subscription, Mutation, Query } from "vesper";
import { EntityManager } from "typeorm";
import { PubSub } from "graphql-subscriptions";
import Message from "../entity/Message";
import User from "../entity/User";

@Controller()
export default class MessageController {
  constructor(private entityManager: EntityManager, private pubSub: PubSub) {}

  @Subscription()
  messageSent({ messageSent }, args) {
    console.log("messageSent", messageSent, "userId", "args");
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
    }).save();
    this.pubSub.publish("messageSent", { messageSent: message });
    return message;
  }

  @Query()
  async getMessages({ userId, otherId }) {
    const user = await User.findOne(userId);
    const other = await User.findOne(otherId);
    const sent = (await Message.find({ where: { from: user, to: other } })).map(
      message => ({ ...message, status: "sent" })
    );
    const recieved = (await Message.find({
      where: { from: other, to: user }
    })).map(message => ({ ...message, status: "recieved" }));

    return [...recieved, ...sent].reduce((acc, curr, i) => {
      if (i === 0) return [curr];
      if (curr.id > acc[acc.length - 1].id) return [...acc, curr];
      else return [curr, ...acc];
    }, []);
  }
}
