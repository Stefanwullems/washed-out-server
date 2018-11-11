import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate
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

  @Column("text", { nullable: false, default: "no specifications" })
  specifications: string;

  @Column("boolean", { nullable: false, default: false })
  completed: boolean;

  @Column("boolean", { nullable: false, default: false })
  paid: boolean;

  @Column("bigint", { nullable: false })
  createdAt: number;

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
