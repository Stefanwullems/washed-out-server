import { MigrationInterface, QueryRunner, createQueryBuilder } from "typeorm";
import User from "../entity/User";
import Location from "../entity/Location";
import getGeolocation, {
  ISearchGeolocationParams
} from "../scripts/geolocation";
import * as bcrypt from "bcryptjs";

export class user1541581077372 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await createQueryBuilder()
      .insert()
      .into(User)
      .values(
        await Promise.all([
          createUser({
            fullName: "Stefan Wullems",
            email: "stefanwullems1998@gmail.com",
            password: "password",
            bio: "Hi, I'm Stefan",
            picture:
              "https://lh3.googleusercontent.com/-ujrTwbBejaA/UrnMCmdEZyE/AAAAAAAAAHU/JuXmkxujrTYBHz6-AXaUzNF7PbWORiL1QCEwYCg/w163-h110-p/ProfilePhotos02",
            locationInput: {
              street: "rijksweg",
              houseNumber: "342",
              postalCode: "2071 CR",
              city: "santpoort-noord",
              country: "the netherlands"
            }
          }),
          createUser({
            fullName: "Mtefan Bullems",
            email: "mtefanbullems1998@gmail.com",
            password: "password",
            bio: "Hi, I'm Mtefan",
            picture:
              "https://lh3.googleusercontent.com/-ujrTwbBejaA/UrnMCmdEZyE/AAAAAAAAAHU/JuXmkxujrTYBHz6-AXaUzNF7PbWORiL1QCEwYCg/w163-h110-p/ProfilePhotos02",
            locationInput: {
              street: "crocusstraat",
              houseNumber: "1",
              postalCode: "2071",
              city: "santpoort-noord",
              country: "the netherlands"
            }
          })
        ])
      );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}

interface IUserParams {
  fullName: string;
  email: string;
  password: string;
  bio: string;
  picture: string;
  locationInput: ISearchGeolocationParams;
}

async function createUser({
  password,
  locationInput,
  ...userInput
}: IUserParams) {
  const location = await Location.create(
    await getGeolocation(locationInput)
  ).save();
  return User.create({
    ...userInput,
    location,
    password: await bcrypt.hash(password, 10)
  }).save();
}
