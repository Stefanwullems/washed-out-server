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

@Entity()
export default class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("text", { nullable: false })
  itemType: string;

  @Column("text", { nullable: false, default: "not specified" })
  material: string;

  @Column("text", { nullable: false, default: "no specifications" })
  specifications: string;

  @ManyToOne(() => User, user => user.items)
  user: User;

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
