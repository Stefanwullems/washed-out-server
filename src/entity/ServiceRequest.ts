import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  JoinColumn
} from "typeorm";
import Item from "./Item";
import User from "./User";
import RequestedServices from "./RequestedServices";

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

  @Column("text", { nullable: false, default: "no specifications" })
  specifications: string;

  @Column("float", { nullable: false, default: 0 })
  additionalCharge: number;

  @Column("boolean", { nullable: false, default: false })
  completed: boolean;

  @Column("boolean", { nullable: false, default: false })
  paid: boolean;

  @Column("bigint", { nullable: false })
  createdAt: number;

  @OneToOne(() => RequestedServices)
  @JoinColumn()
  services: RequestedServices;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = Math.floor(Date.now() / 1000);
  }

  @Column("bigint", { nullable: true })
  updatedAt: number;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = Math.floor(Date.now() / 1000);
  }
}
