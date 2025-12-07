/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(UserProfile) private readonly userProfileRepo: Repository<UserProfile>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.save(createUserDto);
    await this.userProfileRepo.save({ ...createUserDto?.userProfile, user })
    return user;
  }

  async findAll() {
    const users = await this.userRepo.find({ order: { created_at: 'desc' }, relations: { userProfile: true } })
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
