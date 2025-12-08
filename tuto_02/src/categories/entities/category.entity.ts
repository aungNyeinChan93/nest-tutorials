/* eslint-disable prettier/prettier */
import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => Post, post => post.categories)
    @JoinTable({ name: 'categories_posts' })
    posts: Post[]
}
