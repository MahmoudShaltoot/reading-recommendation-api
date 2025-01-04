import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersReadBookService } from './users-read-book.service';
import { CreateUsersReadBookDto } from './dto/create-users-read-book.dto';
import { UpdateUsersReadBookDto } from './dto/update-users-read-book.dto';

@Controller('users-read-book')
export class UsersReadBookController {
  constructor(private readonly usersReadBookService: UsersReadBookService) {}

  @Post()
  create(@Body() createUsersReadBookDto: CreateUsersReadBookDto) {
    return this.usersReadBookService.create(createUsersReadBookDto);
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
  update(@Param('id') id: string, @Body() updateUsersReadBookDto: UpdateUsersReadBookDto) {
    return this.usersReadBookService.update(+id, updateUsersReadBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersReadBookService.remove(+id);
  }
}
