/* eslint-disable prettier/prettier */
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";



export const pgConfig: PostgresConnectionOptions = {
    type: 'postgres',
    url: 'postgresql://neondb_owner:npg_Wjx59fEupTPK@ep-billowing-term-a1vd0b1j-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
    logger: 'advanced-console'
}