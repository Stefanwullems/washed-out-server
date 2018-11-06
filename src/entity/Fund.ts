import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export default class Fund extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false, unique: true })
  name: string;

  @Column("text", { nullable: false })
  manager: string;

  @Column("text", { nullable: false })
  assetClass: string;

  @Column("bigint", { nullable: false })
  size: number;

  @Column("text", { nullable: false })
  status: string;

  @Column("text", { nullable: false })
  region: string;

  @Column("text", { nullable: false })
  impactTheme: string;

  @Column("int", { nullable: false })
  impactRating: number;

  @Column("text", { nullable: false })
  description: string;

  @Column("text", { nullable: false })
  SDG_1: string;

  @Column("text", { nullable: false })
  SDG_2: string;

  @Column("text", { nullable: false })
  SDG_3: string;
}
