/* eslint-disable prettier/prettier */
import { userTable } from './schema/user.schema';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/user.schema'
import { CreateUserDto } from './dto/create-user.dto';
import { hash, genSalt } from 'bcrypt'
import { eq } from 'drizzle-orm';
import { use } from 'passport';

@Injectable()
export class UsersService {

  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await hash(createUserDto?.password, await genSalt(10));
    try {
      const user = await this.db.insert(userTable).values({ ...createUserDto, password: hashPassword }).returning();
      return user;
    } catch (error) {
      throw new ConflictException(error instanceof Error ? error?.message : 'create user fail!')
    }
  }

  async findByEmail(email: string) {
    const user = await this.db.query.userTable.findFirst({
      where: eq(userTable?.email, email)
    });
    if (!user) throw new NotFoundException('user not found!')
    return user;
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
