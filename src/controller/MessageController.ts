import { Controller, Subscription, Mutation, Query, Authorized } from "vesper";
import { EntityManager } from "typeorm";
import { PubSub } from "graphql-subscriptions";
import Message from "../entity/Message";
import User from "../entity/User";

@Controller()
export default class MessageController {
  constructor(
    private entityManager: EntityManager,
    private pubSub: PubSub,
    private User
  ) {}

  @Subscription()
  @Authorized()
  messageSent({ messageSent }, args) {
    console.log("messageSent", messageSent, "userId", args.userId);
    return messageSent.receiver === User;
  }

  @Mutation()
  @Authorized()
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
  @Authorized()
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

  @Query()
  @Authorized()
  async getChats({ userId }) {
    const user = await User.findOne(userId);

    const sentMessages = (await Message.find({
      where: { from: user },
      order: { createdAt: "DESC" },
      relations: ["from", "to"]
    })).map(message => ({ ...message, with: message.to.id }));

    const recievedMessages = (await Message.find({
      where: { to: user },
      order: { createdAt: "DESC" },
      relations: ["from", "to"]
    })).map(message => ({ ...message, with: message.from.id }));

    const allMessages = [...sentMessages, ...recievedMessages];

    const chronologicalChat = allMessages.reduce((acc, curr, i) => {
      if (i === 0) return [curr];
      const arr = acc.filter(message => message.with === curr.with);
      if (arr.length === 0) return [...acc, curr];
      return acc;
    }, []);

    const users = await Promise.all(
      chronologicalChat.map(message => {
        return User.findOne(message.with);
      })
    );

    return users;
  }
}
