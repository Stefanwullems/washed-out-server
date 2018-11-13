import { Controller, Query, Mutation } from "vesper";
import User from "../entity/User";
import Comments from "../entity/Comment";

@Controller()
export default class UserController {
  @Query()
  async getRating({ userId }) {
    const user = await User.findOne(userId);
    const [comments, amount] = await Comments.findAndCount({ where: { user } });
    if (amount === 0) {
      return { rating: 2.5 };
    }
    const totalRating = comments.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0);
    return { rating: totalRating / amount };
  }
}
