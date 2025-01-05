import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { BooksModule } from './books/books.module';
import { UsersReadBookModule } from './users-read-book/users-read-book.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:  [configuration]
  }),
  TypeOrmModule.forRoot(dataSourceOptions),
  EventEmitterModule.forRoot(),
  CacheModule.registerAsync(RedisOptions),
  UsersModule,
  BooksModule,
  UsersReadBookModule
],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
