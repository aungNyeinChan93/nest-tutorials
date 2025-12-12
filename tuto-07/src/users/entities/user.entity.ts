/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash, genSalt } from 'bcrypt';
import { UserRoles } from '../types/users.types';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.guest
  })
  role: UserRoles;

  @Column({ nullable: true })
  hashRefreshToken: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, await genSalt(10));
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
