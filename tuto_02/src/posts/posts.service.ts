/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    private readonly userServie: UsersService,
  ) { }

  async create(createPostDto: CreatePostDto) {
    const user = createPostDto?.user_id && await this.userServie.findOne(Number(createPostDto?.user_id))
    const post = this.postRepo.create({ ...createPostDto, user: user || undefined })
    return await this.postRepo.save(post);
  }

  async findAll() {
    const posts = await this.postRepo.find({ relations: { user: true } })
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
