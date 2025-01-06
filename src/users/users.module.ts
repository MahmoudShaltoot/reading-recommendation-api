import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserReadBookEventHandler } from 'src/handlers/event-handler/user-read-book.handler';
import { RedisService } from 'src/cache/redis.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserReadBookEventHandler, ConfigService, RedisService],
  exports: [UsersService]
})

export class UsersModule {}
