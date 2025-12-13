/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    DrizzleModule
  ]
})
export class PostsModule { }
