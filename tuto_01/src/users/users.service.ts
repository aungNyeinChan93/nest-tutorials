/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUser, UpdateUser } from './schemas/users.zod-schema';
import { PaginationDto } from './dto/pagination.dto';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/utils/constant';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) { };

  async create(createUserDto: CreateUser): Promise<User> {
    const user = this.userRepo.create({ ...createUserDto });
    return this.userRepo.save(user);
  }

  async findAll(pagination: PaginationDto): Promise<{ users: User[] }> {
    const page = Number(pagination?.page || DEFAULT_PAGE);
    const limit = Number(pagination.limit || DEFAULT_LIMIT);
    const skip = (page - 1) * limit;

    const users = await this.userRepo.find(
      {
        take: limit,
        skip,
        order: { id: 'DESC' }
      }
    );
    return { users }
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('user not found!')
    return user;
  }

  async update(id: number, updateUserDto: UpdateUser) {
    const { affected } = await this.userRepo.update({ id }, updateUserDto);
    if (!affected) throw new ConflictException('user update fail')
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    const removeUser = await this.userRepo.remove(user)
    return `${removeUser?.name} was successfully delete`
  }
}
