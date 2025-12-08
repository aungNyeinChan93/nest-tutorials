/* eslint-disable prettier/prettier */
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => Category, category => category.posts)
    categories: Category[]
}
