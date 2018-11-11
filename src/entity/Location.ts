import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity()
export default class Location extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column("text", { nullable: false })
  streetName: string;

  @Column("int", { nullable: false })
  houseNumber: string;

  @Column("text", { nullable: false })
  postalCode: string;

  @Column("text", { nullable: false })
  city: string;

  @Column("text", { nullable: false })
  country: string;

  @Column("float", { nullable: false })
  latitude: number;

  @Column("float", { nullable: false })
  longitude: number;
}
