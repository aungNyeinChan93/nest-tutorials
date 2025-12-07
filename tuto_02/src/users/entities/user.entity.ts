/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserProfile } from "./userProfile.entity";
import { Post } from "src/posts/entities/post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
    userProfile: UserProfile;

    @OneToMany(() => Post, post => post.user)
    posts: Post[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date
}
