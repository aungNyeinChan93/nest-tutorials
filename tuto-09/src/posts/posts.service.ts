import { SelectPost } from './types/posts.types';
/* eslint-disable prettier/prettier */
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/posts.schema'
import { type AuthUser } from 'src/users/types/users.types';
import { eq } from 'drizzle-orm';


@Injectable()
export class PostsService {

  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>
  ) { }

  async create(createPostDto: CreatePostDto, user: AuthUser): Promise<SelectPost> {
    const [post] = await this.db.insert(schema.postTable).values({ ...createPostDto, author_id: user?.id }).returning();
    return post as SelectPost;
  }

  async findAll() {
    const posts = await this.db.query.postTable.findMany({
      with: { user: true }
    })
    return posts;
  }

  async findOne(id: string) {
    try {
      const post = await this.db.query.postTable.findFirst({
        where: eq(schema.postTable?.id, id),
        with: { user: true }
      });
      if (!post) throw new NotFoundException('post not found!')
      return post;
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error?.message : 'post fail')
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const updatePost = await this.db.update(schema.postTable).set({ ...updatePostDto }).where(eq(schema?.postTable?.id, id)).returning();
    return { updatePost };
  }

  async remove(id: string) {
    const [deletePost] = await this.db.delete(schema.postTable).where(eq(schema?.postTable.id, id)).returning();
    return {
      message: `${deletePost?.title} was successfully deleted!`
    }
  }
}
