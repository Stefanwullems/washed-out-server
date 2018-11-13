import { MigrationInterface, QueryRunner, createQueryBuilder } from "typeorm";
import User from "../entity/User";
import Location from "../entity/Location";
import getGeolocation, {
  ISearchGeolocationParams
} from "../scripts/geolocation";
import * as bcrypt from "bcryptjs";
import OfferedServices from "../entity/OfferedServices";
import ServiceFees from "../entity/ServiceFees";

export class users1541600397884 implements MigrationInterface {
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
            status: "Available",
            picture:
              "https://pbs.twimg.com/profile_images/950881287199444992/IQ96yquY.jpg",
            locationInput: {
              address: "rijksweg 342",
              postalCode: "2071 CR",
              city: "santpoort-noord",
              country: "the netherlands"
            },
            services: {
              washing: true,
              drying: true,
              ironing: true,
              folding: true
            },
            serviceFees: {}
          }),
          createUser({
            fullName: "Yuga Wicaksono",
            email: "wicaksono.yuga@gmail.com",
            password: "password",
            bio: "Hi, I'm Yuga",
            status: "Available",
            picture:
              "https://scontent-amt2-1.xx.fbcdn.net/v/t31.0-8/21544068_10210313781784052_6674094088450677522_o.jpg?_nc_cat=100&_nc_ht=scontent-amt2-1.xx&oh=a8229489b9c73bc8d00ee6e70f1b60c2&oe=5C7A15AE",
            locationInput: {
              address: "lingestraat 46",
              postalCode: "2314TJ",
              city: "leiden",
              country: "the netherlands"
            },
            services: {
              washing: true,
              drying: true
            },
            serviceFees: {
              ironing: 1.5,
              drying: 2,
              delivery: 10,
              pickup: 0
            }
          }),
          createUser({
            fullName: "Swetha Amuru",
            email: "amuru.codais@gmail.com",
            password: "password",
            bio: "Hi, I'm Sveta",
            status: "Unavailable",
            picture:
              "https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-1/p160x160/41141735_2207448662629870_1888814140177252352_n.jpg?_nc_cat=104&_nc_ht=scontent-amt2-1.xx&oh=20ffc02da9f7559a0f61f4a55f087b70&oe=5C818089",
            locationInput: {
              address: "Geervliet 60",
              postalCode: "1082HV",
              city: "Amsterdam",
              country: "the netherlands"
            },
            services: {
              washing: true,
              drying: true,
              delivery: true,
              pickup: true
            },
            serviceFees: {
              ironing: 1.5,
              drying: 2,
              delivery: 10,
              pickup: 0
            }
          }),
          createUser({
            fullName: "Thomas Ham",
            email: "thomasham89@gmail.com",
            password: "password",
            bio: "Hi, I'm Thomas",
            status: "Available",
            picture:
              "https://ca.slack-edge.com/T0DK39WAJ-UCPKCEXQF-a51b351a955e-48",
            locationInput: {
              address: "Van Nijenrodeweg 588",
              postalCode: "1082HV",
              city: "Amsterdam",
              country: "the netherlands"
            },
            services: {
              washing: true,
              drying: true,
              ironing: true,
              folding: true,
              delivery: true,
              pickup: true
            },
            serviceFees: {
              ironing: 1.5,
              drying: 2,
              delivery: 10,
              pickup: 0
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
  status: string;
  services: ICreateServicesParams;
  serviceFees: ICreateServiceFeesParams;
}

async function createUser({
  password,
  locationInput,
  services,
  serviceFees,
  ...userInput
}: IUserParams) {
  const location = await Location.create(
    await getGeolocation(locationInput)
  ).save();
  return User.create({
    ...userInput,
    location,
    password: await bcrypt.hash(password, 10),
    services: await createServices(services),
    serviceFees: await createServiceFees(serviceFees)
  }).save();
}

interface ICreateServicesParams {
  washing?: boolean;
  drying?: boolean;
  ironing?: boolean;
  folding?: boolean;
  delivery?: boolean;
  pickup?: boolean;
}

async function createServices({
  washing = false,
  drying = false,
  ironing = false,
  folding = false,
  delivery = false,
  pickup = false
}: ICreateServicesParams) {
  return OfferedServices.create({
    washing,
    drying,
    ironing,
    folding,
    delivery,
    pickup
  }).save();
}

interface ICreateServiceFeesParams {
  washing?: number;
  drying?: number;
  ironing?: number;
  folding?: number;
  delivery?: number;
  pickup?: number;
  base?: number;
}

async function createServiceFees({
  washing = 10,
  drying = 0,
  ironing = 1,
  folding = 0.2,
  delivery = 5,
  pickup = 5,
  base = 2
}: ICreateServiceFeesParams) {
  return ServiceFees.create({
    washing,
    drying,
    ironing,
    folding,
    delivery,
    pickup,
    base
  }).save();
}
