import { Controller, Query, Mutation, Authorized } from "vesper";
import User from "../entity/User";
import Location from "../entity/Location";
import geoLocation from "../scripts/geolocation";

@Controller()
export default class LocationController {
  @Authorized()
  @Query()
  async getLocation(args) {
    const user = await User.findOne(args.userId);
    return Location.findOne({ where: { user } });
  }

  @Mutation()
  @Authorized()
  async setLocation(args) {
    const { userId, id, ...rest } = args;

    const location =
      (await Location.findOne(id)) ||
      (await Location.create(await geoLocation(rest)).save());

    const user = await User.findOne(userId);

    user.location = location;
    await user.save();

    console.log(user);

    return user.location;
  }
}
