/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: '50' })
    title: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => User, user => user.posts, { cascade: false })
    @JoinColumn({ name: "user_id" })
    user: User
}
