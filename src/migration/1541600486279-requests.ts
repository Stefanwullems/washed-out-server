import {
  MigrationInterface,
  QueryRunner,
  createQueryBuilder,
  getConnection
} from "typeorm";
import ServiceRequest from "../entity/ServiceRequest";
import Item from "../entity/Item";
import User from "../entity/User";

export class requests1541600486279 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await createQueryBuilder()
      .insert()
      .into(ServiceRequest)
      .values([
        await createRequest({
          items: [
            { type: "pants", material: "denim" },
            { type: "shirt", material: "silk", specifications: "not too hot" }
          ],
          fromId: 1,
          toId: 2
        }),
        await createRequest({
          items: [
            { type: "trousers", material: "denim" },
            { type: "shirt", material: "silk", specifications: "not too hot" }
          ],
          fromId: 2,
          toId: 1
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
  fromId: number;
  toId: number;
}

async function createRequest({
  items,
  fromId,
  toId
}: ICreateServiceRequestParams) {
  const from = await User.findOne(fromId);
  const to = await User.findOne(toId);
  return ServiceRequest.create({
    items: await Promise.all<Item>(
      items.map(async item => {
        return Item.create({ ...item, user: from }).save();
      })
    ),
    from,
    to
  }).save();
}
