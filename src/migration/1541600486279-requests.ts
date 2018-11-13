import {
  MigrationInterface,
  QueryRunner,
  createQueryBuilder,
  getConnection
} from "typeorm";
import ServiceRequest from "../entity/ServiceRequest";
import Item from "../entity/Item";
import User from "../entity/User";
import RequestedServices from "../entity/RequestedServices";

export class requests1541600486279 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await createQueryBuilder()
      .insert()
      .into(ServiceRequest)
      .values([
        await createRequest({
          items: [
            { itemType: "pants", count: 2 },
            { itemType: "shirt", count: 5 }
          ],
          fromId: 1,
          toId: 2,
          specifications: "I need it done before tomorrow",
          additionalCharge: 3,
          services: {}
        }),
        await createRequest({
          items: [
            { itemType: "trousers", count: 1 },
            { itemType: "shirt", count: 4 },
            { itemType: "socks", count: 5 }
          ],
          fromId: 2,
          toId: 1,
          services: {}
        }),
        await createRequest({
          items: [
            { itemType: "trousers", count: 1 },
            { itemType: "shirt", count: 4 },
            { itemType: "socks", count: 5 }
          ],
          fromId: 4,
          toId: 1,
          services: {
            ironing: true
          }
        })
      ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}

interface ICreateServicesParams {
  washing?: boolean;
  drying?: boolean;
  ironing?: boolean;
  folding?: boolean;
  delivery?: boolean;
  pickup?: boolean;
}

interface IItem {
  itemType: string;
  count: number;
}
interface ICreateServiceRequestParams {
  items: IItem[];
  fromId: number;
  toId: number;
  specifications?: string;
  additionalCharge?: number;
  completed?: boolean;
  paid?: boolean;
  services?: ICreateServicesParams;
}
async function createRequest({
  items,
  fromId,
  toId,
  completed = false,
  paid = false,
  services,
  additionalCharge = 0,
  specifications
}: ICreateServiceRequestParams) {
  return ServiceRequest.create({
    items: await Promise.all<Item>(
      items.map(async item => {
        return Item.create({ ...item }).save();
      })
    ),
    from: await User.findOne(fromId),
    to: await User.findOne(toId),
    completed,
    paid,
    services: await createServices(services),
    additionalCharge,
    specifications
  }).save();
}

async function createServices({
  washing = true,
  drying = true,
  ironing = false,
  folding = false,
  delivery = false,
  pickup = false
}: ICreateServicesParams) {
  return RequestedServices.create({
    washing,
    drying,
    ironing,
    folding,
    delivery,
    pickup
  }).save();
}
