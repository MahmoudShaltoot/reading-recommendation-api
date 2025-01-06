import { Module } from '@nestjs/common';
import { UsersReadBookService } from './users-read-book.service';
import { UsersReadBookController } from './users-read-book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserReadBook } from './entities/user-read-book.entity';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { RedisService } from 'src/cache/redis.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserReadBook, User, Book])],
  controllers: [UsersReadBookController],
  providers: [UsersReadBookService, RedisService, ConfigService, JwtService],
})
export class UsersReadBookModule {}
