/* eslint-disable prettier/prettier */
import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";
import { userTable } from "src/users/schema/user.schema";



export const postTable = pgTable('posts', {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
    description: text().notNull(),
    author_id: uuid().references(() => userTable?.id, { onDelete: 'cascade' }),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().$onUpdate(() => new Date),
},
    (table) => ({
        titleIndex: index('titleIndex').on(table?.title)
    })
);


export const postRelation = relations(postTable, ({ one }) => ({
    user: one(userTable, {
        fields: [postTable.author_id],
        references: [userTable?.id]
    })
}))


