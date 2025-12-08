/* eslint-disable prettier/prettier */
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { uuid, text } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export type Quote = InferSelectModel<typeof quoteTable>
export type CreateQuote = InferInsertModel<typeof quoteTable>
export type UpdateQuote = Partial<CreateQuote>

export const quoteTable = pgTable('quotes', {
    id: uuid().primaryKey().defaultRandom(),
    quote: text().notNull()
});

