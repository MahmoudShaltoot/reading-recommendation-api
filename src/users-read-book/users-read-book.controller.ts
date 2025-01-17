import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { UsersReadBookService } from './users-read-book.service';
import { CreateUserReadBookDto } from './dto/create-user-read-book.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { JwtAdminAuthGuard } from 'src/guards/admin.guard';
import { OwnerOrAdminGuard } from 'src/guards/owner-or-admin.guard';

@Controller('user-read')
export class UsersReadBookController {
  constructor(private readonly usersReadBookService: UsersReadBookService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create(@Body() createUserReadBookDto: CreateUserReadBookDto) {
    return this.usersReadBookService.create(createUserReadBookDto);
  }

  @Get('/recommended-books')
  getRecommendedBooks() {
    return this.usersReadBookService.getRecommendedBooks()
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get()
  findAll(
    @Query('page') page: number = 0,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.usersReadBookService.findAll(page, pageSize);
  }

  @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersReadBookService.findOne(+id);
  }

}
