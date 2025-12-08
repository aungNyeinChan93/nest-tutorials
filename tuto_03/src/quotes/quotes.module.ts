/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService],
  imports: [DrizzleModule],
})
export class QuotesModule { }
