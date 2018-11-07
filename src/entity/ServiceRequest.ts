import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import Item from "./Item";

@Entity()
export default class ServiceRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @JoinTable()
  @ManyToMany(() => Item, item => item.serviceRequests)
  items: Item[];

  @Column("boolean", { nullable: false, default: false })
  completed: boolean;

  @Column("boolean", { nullable: false, default: false })
  paid: boolean;
}
