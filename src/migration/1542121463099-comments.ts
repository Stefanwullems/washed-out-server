import { MigrationInterface, QueryRunner, createQueryBuilder } from "typeorm";
import Comment from "../entity/Comment";
import User from "../entity/User";

export class comments1542121463099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await createQueryBuilder()
      .insert()
      .into(Comment)
      .values([
        await createComment({
          fromId: 1,
          toId: 2,
          content: "you did very well",
          rating: 4.5
        }),
        await createComment({
          fromId: 1,
          toId: 3,
          content: "10/10",
          rating: 5
        }),
        await createComment({
          fromId: 1,
          toId: 4,
          content: "Thanks for the laundry, missed some socks though",
          rating: 3
        }),
        await createComment({
          fromId: 2,
          toId: 1,
          content: "I did not like",
          rating: 2
        }),
        await createComment({
          fromId: 2,
          toId: 3,
          content: "It was nice",
          rating: 3
        }),
        await createComment({
          fromId: 2,
          toId: 4,
          content: "You've scorched my shirt while ironing",
          rating: 2
        }),
        await createComment({
          fromId: 3,
          toId: 1,
          content: "AWESOME",
          rating: 5
        }),
        await createComment({
          fromId: 3,
          toId: 2,
          content: "very quick and goog",
          rating: 5
        }),
        await createComment({
          fromId: 3,
          toId: 4,
          content: "I like the smell of your washing soap",
          rating: 4.5
        })
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}

interface ICreateCommentParams {
  fromId: number;
  toId: number;
  content: string;
  rating: number;
}

async function createComment({
  fromId,
  toId,
  ...comment
}: ICreateCommentParams) {
  const from = await User.findOne(fromId);
  const to = await User.findOne(toId);

  return Comment.create({ from, to, ...comment });
}
