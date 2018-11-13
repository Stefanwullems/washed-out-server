import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import User from "./User";
import ServiceRequest from "./ServiceRequest";

@Entity()
export default class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("text", { nullable: false })
  itemType: string;

  @Column("int", { nullable: false })
  count: number;

  @ManyToOne(() => ServiceRequest)
  serviceRequest: ServiceRequest;
}
