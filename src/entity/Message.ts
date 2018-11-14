import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  BeforeInsert,
  JoinColumn
} from "typeorm";

import User from "./User";

@Entity()
export default class Message extends BaseEntity {
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

  @Column("bigint", { nullable: false })
  createdAt: number;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = Math.floor(Date.now() / 1000);
  }
}
