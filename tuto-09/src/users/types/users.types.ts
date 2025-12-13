/* eslint-disable prettier/prettier */
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { userTable } from "../schema/user.schema";




export type SelectUser = InferSelectModel<typeof userTable>
export type CreateUser = InferInsertModel<typeof userTable>
export type UpdateUser = Partial<Omit<SelectUser, 'id'>>
export type AuthUser = Omit<SelectUser, 'password'>
