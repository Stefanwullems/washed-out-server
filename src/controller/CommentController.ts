import { Controller, Mutation } from "vesper";
import User from "../entity/User";
import Comment from "../entity/Comment";

@Controller()
export default class CommentController {
  @Mutation()
  async createComment(args) {
    console.log(args);
    const { fromId, toId, ...rest } = args;

    return Comment.create({
      from: await User.findOne(fromId),
      to: await User.findOne(toId),
      ...rest
    }).save();
  }
}
