/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hash, genSalt } from 'bcrypt'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    hashRefreshToken: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, await genSalt(10));
    }

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date
}
