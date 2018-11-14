import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";

import User from "./User";

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, user => user.createdRequests)
  @JoinColumn()
  from: User;

  @ManyToOne(() => User, user => user.recievedRequests)
  @JoinColumn()
  to: User;

  @Column("text", { nullable: false })
  content: string;

  @Column("float", { nullable: true, default: 2.5 })
  rating: number;

  @Column("bigint", { nullable: false })
  createdAt: number;

  @Column("bigint", { nullable: true })
  updatedAt: number;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = Math.floor(Date.now() / 1000);
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = Math.floor(Date.now() / 1000);
  }
}
