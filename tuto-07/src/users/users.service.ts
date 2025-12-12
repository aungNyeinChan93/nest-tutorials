/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  private logger: Logger = new Logger(UsersService.name, { timestamp: true })

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepo.create(createUserDto);
      const saveUser = await this.userRepo.save(user);
      return saveUser;
    } catch (error) {
      this.logger.error(error instanceof Error ? error?.message : "user create fail")
      throw new ConflictException(error instanceof Error ? error?.message : 'user create fail')
    }
  };

  async findByEmail({ email }: { email: string }) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new NotFoundException('user not found!')
    return user;
  }


  async updateHashRefreshToken({ userId, hashRefreshToken }: { userId: number, hashRefreshToken: string | null }) {
    const { affected } = await this.userRepo.update(userId, { hashRefreshToken: hashRefreshToken! })
    if (!affected) throw new ConflictException('update refreshToken fail!')
    return true;
  }

  async findAll() {
    const users = await this.userRepo.find({
      order: { created_at: 'DESC' },
    })
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const { affected } = await this.userRepo.delete(id);
    if (!affected) throw new UnauthorizedException('delete user fail!')
    return { message: 'user delete successfully!' };
  }
}
