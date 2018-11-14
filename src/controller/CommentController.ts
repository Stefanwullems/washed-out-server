import { Controller, Mutation, Query } from "vesper";
import User from "../entity/User";
import Comment from "../entity/Comment";

@Controller()
export default class CommentController {
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
  async getComments({ userId }) {
    const user = await User.findOne(userId);
    return Comment.find({ where: { to: user } });
  }
}
