/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { EntityManager, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
    private readonly userServie: UsersService,
    private readonly entityManager: EntityManager,
  ) { }

  async create(createPostDto: CreatePostDto, categoryId: number) {
    const category = await this.categoryRepo.findOne({ where: { id: categoryId } });
    console.log({ category });

    if (!category) throw new NotFoundException('Category not found!');
    const user = createPostDto?.user_id && await this.userServie.findOne(Number(createPostDto?.user_id));
    if (!user) throw new NotFoundException('user not found!');
    const post = this.postRepo.create({ ...createPostDto, user: user || undefined, categories: [category] });
    // post.categories = [...post.categories, category];
    return await this.postRepo.save(post);
  }

  async findAll() {
    const posts = await this.postRepo.find({ relations: { user: true, categories: true }, order: { id: 'desc' } })
    return posts;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
