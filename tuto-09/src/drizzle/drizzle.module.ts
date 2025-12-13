/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './database/schema'
export const DRIZZLE = 'drizzle-connection';

@Module({
    providers: [
        {
            provide: DRIZZLE,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const pg = new Pool({
                    connectionString: configService.getOrThrow<string>('DATABASE_URL'),
                });
                const db = drizzle({ client: pg, schema, logger: true });
                return db;
            },
        },
    ],
    exports: [DRIZZLE]
})
export class DrizzleModule { };


