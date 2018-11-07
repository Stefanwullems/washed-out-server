import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import User from "./User";

@Entity()
export default class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("text", { nullable: false })
  type: string;

  @Column("text", { nullable: true })
  material: string;

  @Column("text", { nullable: true })
  specifications: string;

  @ManyToOne(() => User, user => user.items)
  user: User;
}
