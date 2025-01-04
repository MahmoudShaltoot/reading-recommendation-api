import { Module } from '@nestjs/common';
import { UsersReadBookService } from './users-read-book.service';
import { UsersReadBookController } from './users-read-book.controller';

@Module({
  controllers: [UsersReadBookController],
  providers: [UsersReadBookService],
})
export class UsersReadBookModule {}
