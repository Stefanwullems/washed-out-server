import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import User from "./User";

@Entity()
export default class Services extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("boolean", { nullable: false, default: false })
  washing?: boolean;

  @Column("boolean", { nullable: false, default: false })
  drying?: boolean;

  @Column("boolean", { nullable: false, default: false })
  ironing?: boolean;

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
