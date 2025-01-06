import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersReadBookService } from './users-read-book.service';
import { CreateUserReadBookDto } from './dto/create-user-read-book.dto';

@Controller('users-read')
export class UsersReadBookController {
  constructor(private readonly usersReadBookService: UsersReadBookService) {}

  @Post()
  create(@Body() createUserReadBookDto: CreateUserReadBookDto) {
    return this.usersReadBookService.create(createUserReadBookDto);
  }

  @Get('/recommended-books')
  getRecommendedBooks() {
    return this.usersReadBookService.getRecommendedBooks()
  }

  @Get()
  findAll() {
    return this.usersReadBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersReadBookService.findOne(+id);
  }

}
