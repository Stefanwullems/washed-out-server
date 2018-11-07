import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne
} from "typeorm";
import Item from "./Item";
import User from "./User";

@Entity()
export default class ServiceRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, user => user.createdRequests)
  @JoinTable()
  from: User;

  @ManyToOne(() => User, user => user.recievedRequests)
  @JoinTable()
  to: User;

  @JoinTable()
  @ManyToMany(() => Item)
  items: Item[];

  @Column("boolean", { nullable: false, default: false })
  completed: boolean;

  @Column("boolean", { nullable: false, default: false })
  paid: boolean;
}
