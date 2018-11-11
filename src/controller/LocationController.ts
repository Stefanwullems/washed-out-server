import { Controller, Query, Mutation } from "vesper";
import User from "../entity/User";
import Location from "../entity/Location";
import geoLocation from "../scripts/geolocation";

@Controller()
export default class LocationController {
  @Query()
  async getLocation(args) {
    const user = await User.findOne(args.userId);
    return Location.findOne({ where: { user } });
  }

  @Mutation()
  async addLocation(args) {
    const { userId, ...rest } = args;

    const location = await Location.create(await geoLocation(rest)).save();

    const user = await User.findOne(userId);
    user.location = location;
    user.save();

    return user.location;
  }
}
