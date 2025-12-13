/* eslint-disable prettier/prettier */
import { relations } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { postTable } from "src/posts/schema/posts.schema";



export const userRole = pgEnum('userRole', ['guest', 'user', 'admin']);
export type UserRole = typeof userRole.enumValues[number];

export const userTable = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    role: userRole().default('guest'),
    hashRefreshToken: text(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().$onUpdate(() => new Date).notNull(),
}, (table) => ({
    emailIndex: index('emailIndex').on(table?.email)
}));

export const userRelation = relations(userTable, ({ many }) => ({
    posts: many(postTable)
}))






