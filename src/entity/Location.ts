import { Entity, PrimaryColumn, Column, BaseEntity, OneToMany } from "typeorm";
import User from "./User";

@Entity()
export default class Location extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column("text", { nullable: true })
  streetName: string;

  @Column("int", { nullable: true })
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

  @OneToMany(() => User, user => user.location)
  users: User[];
}
