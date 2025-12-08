/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(UserProfile) private readonly userProfileRepo: Repository<UserProfile>,
    private entityManager: EntityManager,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { post, user, userProfile } = await this.entityManager.transaction(async (entityManager) => {
      const user = await this.userRepo.save(createUserDto);
      const userProfile = this.userProfileRepo.create({ ...createUserDto?.userProfile, user })
      await entityManager.save(userProfile)

      // test 
      const post = new Post();
      post.title = 'test';
      post.user = user;
      post.description = '';
      await entityManager.save(post)
      // test end


      return { user, userProfile, post };
    })
    return { user, userProfile, post };
  }

  async findAll() {
    const users = await this.userRepo.find({ order: { created_at: 'desc' }, relations: ['userProfile', 'posts'] })
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } })
    if (!user) throw new NotFoundException('user not found!')

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
