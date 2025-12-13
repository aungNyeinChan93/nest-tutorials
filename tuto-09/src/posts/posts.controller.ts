/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthUser } from 'src/users/types/users.types';
import { Role } from 'src/auth/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() { user }: { user: AuthUser }) {
    return this.postsService.create(createPostDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Role('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
