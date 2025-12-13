/* eslint-disable prettier/prettier */
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { postTable } from "../schema/posts.schema";



export type SelectPost = InferSelectModel<typeof postTable>;
export type CreatePost = InferInsertModel<typeof postTable>
export type UpdatePost = Partial<Omit<SelectPost, 'id'>>