import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserReadBookEventHandler } from 'src/event-handler/user-read-book-event-handler.ts/user-read-book.handler';
import { RedisService } from 'src/cache/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserReadBookEventHandler, RedisService],
})

export class UsersModule {}
