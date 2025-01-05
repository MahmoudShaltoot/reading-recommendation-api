import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersReadBookService } from './users-read-book.service';
import { CreateUserReadBookDto } from './dto/create-user-read-book.dto';
import { UpdateUserReadBookDto } from './dto/update-user-read-book.dto';

@Controller('users-read-progress')
export class UsersReadBookController {
  constructor(private readonly usersReadBookService: UsersReadBookService) {}

  @Post()
  create(@Body() createUserReadBookDto: CreateUserReadBookDto) {
    return this.usersReadBookService.create(createUserReadBookDto);
  }

  @Get()
  findAll() {
    return this.usersReadBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersReadBookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserReadBookDto: UpdateUserReadBookDto) {
    return this.usersReadBookService.update(+id, updateUserReadBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersReadBookService.remove(+id);
  }
}
