import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { MinLength, IsString, IsEmail } from "class-validator";
import { Exclude } from "class-transformer";
import Location from "./Location";
import ServiceRequest from "./ServiceRequest";
import OfferedServices from "./OfferedServices";
import ServiceFees from "./ServiceFees";
import Comment from "./Comment";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: false })
  fullName: string;

  @IsEmail()
  @Column("text", { nullable: false, unique: true })
  email: string;

  @IsString()
  @MinLength(8)
  @Exclude({ toPlainOnly: true })
  @Column("text", { nullable: false })
  password: string;

  @IsString()
  @Column("text", { nullable: false, default: "" })
  bio?: string;

  @JoinColumn()
  @OneToOne(() => OfferedServices)
  services: OfferedServices;

  @JoinColumn()
  @OneToOne(() => ServiceFees)
  serviceFees: ServiceFees;

  @IsString()
  @Column("text", {
    nullable: false,
    default:
      "https://www.whittierfirstday.org/wp-content/uploads/default-user-image-e1501670968910.png"
  })
  picture: string;

  @Column("text", { nullable: false, default: "Available" })
  status: string;

  @ManyToOne(() => Location, location => location.users)
  @JoinColumn()
  location: Location;

  @OneToMany(() => ServiceRequest, serviceRequest => serviceRequest.from)
  @JoinColumn()
  createdRequests: ServiceRequest[];

  @OneToMany(() => ServiceRequest, serviceRequest => serviceRequest.to)
  @JoinColumn()
  recievedRequests: ServiceRequest[];

  @OneToMany(() => Comment, comment => comment.from)
  @JoinColumn()
  createdComments: Comment[];

  @OneToMany(() => Comment, comment => comment.to)
  @JoinColumn()
  recievedComments: Comment[];

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

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10);
    this.password = hash;
  }

  async passwordMatches(rawPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(rawPassword, this.password);
    if (!isMatch) throw new Error("Wrong password");
    return true;
  }
}
