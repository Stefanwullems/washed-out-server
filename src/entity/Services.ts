import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import User from "./User";


@Entity()
export default class Services extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("boolean", {nullable: false, default:false})
  washing?: boolean;

  @Column("boolean", {nullable: false, default:false})
  drying?: boolean;

  @Column("boolean", {nullable: false, default:false})
  ironing?: boolean;

  @OneToOne(()=>User)
  @JoinColumn()
  user:User

}
