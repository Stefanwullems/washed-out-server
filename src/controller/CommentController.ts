import { Controller, Mutation, Query, Authorized } from "vesper";
import User from "../entity/User";
import Comment from "../entity/Comment";

@Controller()
export default class CommentController {
  @Authorized()
  @Mutation()
  async createComment(args) {
    const { fromId, toId, ...rest } = args;

    return Comment.create({
      from: await User.findOne(fromId),
      to: await User.findOne(toId),
      ...rest
    }).save();
  }

  @Query()
  @Authorized()
  async getComments({ userId }) {
    const user = await User.findOne(userId);
    return Comment.find({ where: { to: user } });
  }
}
