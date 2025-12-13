/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { AuthUser } from 'src/users/types/users.types';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    private readonly userService: UsersService,
  ) { }

  async create(createPostDto: CreatePostDto, authUser: AuthUser) {
    const user = await this.userService.findByEmail(authUser?.email);
    const post = this.postRepo.create({ ...createPostDto, user });
    const savePost = await this.postRepo.save(post);
    return savePost;
  }

  async findAll() {
    const posts = await this.postRepo.find({
      relations: { user: true },
      order: { createdAt: 'DESC' }
    })
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: { user: true }
    });
    if (!post) throw new NotFoundException('post not found')
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { affected } = await this.postRepo.update(id, updatePostDto);
    if (!affected) throw new ConflictException('post update fail!')
    return await this.findOne(id);
  }

  async remove(id: number) {
    const { affected } = await this.postRepo.delete(id);
    if (!affected) throw new ConflictException('post delete fail!')
    return { message: 'delete success!' };
  }
}
