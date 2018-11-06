import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import * as bcrypt from "bcrypt"
import {
  MinLength,
  IsString,
  IsEmail
} from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: false})
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

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

}
