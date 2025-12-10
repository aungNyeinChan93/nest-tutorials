/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { verify } from 'argon2'
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userrRepo: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userrRepo.create(createUserDto);
    const saveUser = await this.userrRepo.save(user);
    return saveUser;
  }

  async findByEmail(email: string) {
    const user = await this.userrRepo.findOne({
      where: { email }
    });
    if (!user) throw new NotFoundException('user not found!')
    return user;
  }

  async updatehashRefreshToken({ userId, hashRefreshToken }: { userId: number, hashRefreshToken: string | null }) {
    const user = await this.userrRepo.update(userId, { hashRefreshToken: hashRefreshToken! })
    return user;
  }

  async validateRefreshToken({ userId, refreshToken }: { userId: number, refreshToken: string }) {
    const user = await this.userrRepo.findOne({ where: { id: userId } });
    if (!user || !user?.hashRefreshToken) throw new UnauthorizedException('refresh token invalid!');
    const hashRefreshMatch = await verify(user?.hashRefreshToken, refreshToken);
    if (!hashRefreshMatch) throw new UnauthorizedException('refresh token invalid!')
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
