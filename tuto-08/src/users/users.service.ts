/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthUser } from './types/users.types';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto)
    const saveUser = await this.userRepo.save(user)
    return saveUser;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new NotFoundException('user not found')
    return user;
  };

  async updateHashRefreshToken({ userId, refreshToken }: { userId: number, refreshToken: string | null }) {
    const { affected } = await this.userRepo.update(userId, { hashRefreshToken: refreshToken as string })
    if (!affected) throw new ConflictException('update refreshToken fail');
    return true;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
