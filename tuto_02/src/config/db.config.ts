/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ConfigService, registerAs } from '@nestjs/config'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js'


export default registerAs('dbConfig.dev', (): PostgresConnectionOptions => ({
    type: 'postgres',
    // url:

}));