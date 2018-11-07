import { MigrationInterface, QueryRunner, createQueryBuilder } from "typeorm";
import ServiceRequest from "../entity/ServiceRequest";
import Item from "../entity/Item";
import User from "../entity/User";

export class request1541588477881 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    createQueryBuilder()
      .insert()
      .into(ServiceRequest)
      .values([
        await createRequest({
          items: [
            { type: "pants", material: "denim" },
            { type: "shirt", material: "silk", specifications: "not too hot" }
          ],
          userId: 1
        }),
        await createRequest({
          items: [
            { type: "trousers", material: "denim" },
            { type: "shirt", material: "silk", specifications: "not too hot" }
          ],
          userId: 2
        })
      ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}

interface IItem {
  type: string;
  material: string;
  specifications?: string;
}

interface ICreateServiceRequestParams {
  items: IItem[];
  userId: number;
}

async function createRequest({ items, userId }: ICreateServiceRequestParams) {
  const user = await User.findOne(userId);
  return ServiceRequest.create({
    items: await Promise.all<Item>(
      items.map(async item => {
        return Item.create({ ...item, user }).save();
      })
    )
  }).save();
}
