import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";

@Entity()
export default class RequestedServices extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("boolean", { nullable: false, default: false })
  washing?: boolean;

  @Column("boolean", { nullable: false, default: false })
  drying?: boolean;

  @Column("boolean", { nullable: false, default: false })
  ironing?: boolean;

  @Column("boolean", { nullable: false, default: false })
  folding?: boolean;

  @Column("boolean", { nullable: false, default: false })
  delivery?: boolean;

  @Column("boolean", { nullable: false, default: false })
  pickup?: boolean;

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
