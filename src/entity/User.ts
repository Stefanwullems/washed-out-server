import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { MinLength, IsString, IsEmail } from "class-validator";
import { Exclude } from "class-transformer";
import Location from "./Location";
import Item from "./Item";
import ServiceRequest from "./ServiceRequest";
import Services from "./Services";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: false })
  fullName: string;

  @IsEmail()
  @Column("text", { nullable: false })
  email: string;

  @IsString()
  @MinLength(8)
  @Exclude({ toPlainOnly: true })
  @Column("text", { nullable: false })
  password: string;

  @IsString()
  @Column("text", { nullable: true })
  bio?: string;

  @JoinColumn()
  @OneToOne(() => Services)
  services: Services;

  @IsString()
  @Column("text", { nullable: true })
  picture: string;

  @OneToOne(() => Location)
  @JoinColumn()
  location: Location;

  @OneToMany(() => Item, item => item.user)
  @JoinColumn()
  items: Item[];

  @OneToMany(() => ServiceRequest, serviceRequest => serviceRequest.from)
  @JoinColumn()
  createdRequests: ServiceRequest[];

  @OneToMany(() => ServiceRequest, serviceRequest => serviceRequest.to)
  @JoinColumn()
  recievedRequests: ServiceRequest[];

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10);
    this.password = hash;
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }

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
