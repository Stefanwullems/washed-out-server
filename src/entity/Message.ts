// import {
//   Entity,
//   Column,
//   BaseEntity,
//   PrimaryGeneratedColumn,
//   JoinTable,
//   ManyToOne,
//   BeforeInsert,
//   BeforeUpdate
// } from "typeorm";

// import User from "./User";

// @Entity()
// export default class Message extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id?: number;

//   @ManyToOne(() => User, user => user.createdRequests)
//   @JoinTable()
//   from: User;

//   @ManyToOne(() => User, user => user.recievedRequests)
//   @JoinTable()
//   to: User;

//   @Column("text", { nullable: false })
//   content: string;

//   @Column("bigint", { nullable: false })
//   createdAt: number;

//   @BeforeInsert()
//   setCreatedAt() {
//     this.createdAt = Math.floor(Date.now() / 1000);
//   }
// }
