/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";



@Entity({ name: "user_profile" })
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    bio: string;

    @Column({ nullable: true })
    avator: string;

    @Column({ default: false })
    isEmailVerify: boolean;

    @OneToOne(() => User, (user) => user.userProfile, { cascade: true })
    @JoinColumn({ name: 'user_id' })
    user: User

}