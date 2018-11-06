import { MigrationInterface, QueryRunner, createQueryBuilder } from "typeorm";
import Fund from "../entity/Fund";

export class fundEntityPrototype1541430642089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await createQueryBuilder()
      .insert()
      .into(Fund)
      .values(["1", "2", "3", "4", "5"].map(createDummyData))
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}

function createDummyData(n): Partial<Fund> {
  return {
    name: "testName" + n,
    manager: "testManager" + n,
    assetClass: "testAssetClass" + n,
    size: 100000000 * Number(n),
    status: "testStatus" + n,
    region: "testRegion" + n,
    impactTheme: "testImpactTheme" + n,
    impactRating: Number(n),
    description: "testDescription" + n,
    SDG_1:
      "https://sustainabledevelopment.un.org/content/images/E_SDG_Icons-03.jpg",
    SDG_2:
      "https://sustainabledevelopment.un.org/content/images/E_SDG_Icons-03.jpg",
    SDG_3:
      "https://sustainabledevelopment.un.org/content/images/E_SDG_Icons-03.jpg"
  };
}
