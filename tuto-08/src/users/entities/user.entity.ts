/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hash, genSalt } from 'bcrypt'
import { UserRole } from "../types/users.types";
import { Post } from "src/posts/entities/post.entity";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, await genSalt(10));
    };

    @Column({ nullable: true })
    hashRefreshToken: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.guest
    })
    role: UserRole;

    @OneToMany(() => Post, post => post.user)
    posts: Post[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}
