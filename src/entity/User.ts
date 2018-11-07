import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  OneToMany
} from "typeorm";
import * as bcrypt from "bcryptjs"
import { MinLength, IsString, IsEmail } from "class-validator";
import { Exclude } from "class-transformer";
import Location from "./Location";
import Item from "./Item";
import ServiceRequest from "./ServiceRequest";

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
  @Column("text", { nullable: false })
  bio: string;

  @IsString()
  @Column("text", { nullable: false })
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
}
