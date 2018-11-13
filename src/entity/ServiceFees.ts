import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export default class ServiceFees extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("float", { nullable: false, default: 10 })
  washing: number;

  @Column("float", { nullable: false, default: 0 })
  drying: number;

  @Column("float", { nullable: false, default: 1 })
  ironing: number;

  @Column("float", { nullable: false, default: 0.2 })
  folding: number;

  @Column("float", { nullable: false, default: 5 })
  delivery: number;

  @Column("float", { nullable: false, default: 5 })
  pickup: number;

  @Column("float", { nullable: false, default: 0 })
  base: number;
}
