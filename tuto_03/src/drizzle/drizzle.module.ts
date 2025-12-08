/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './database/schema'


export const DRIZZLE = Symbol('drizzle_connection');

@Module({
    providers: [
        {
            provide: DRIZZLE,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const pool = new Pool({
                    connectionString: configService.getOrThrow<string>('DATABASE_URL')
                });
                return drizzle({ client: pool, schema }) as NodePgDatabase<typeof schema>
            }
        }
    ],
    exports: [DRIZZLE]
})
export class DrizzleModule { }
