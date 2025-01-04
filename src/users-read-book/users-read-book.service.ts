import { Injectable } from '@nestjs/common';
import { CreateUsersReadBookDto } from './dto/create-users-read-book.dto';
import { UpdateUsersReadBookDto } from './dto/update-users-read-book.dto';

@Injectable()
export class UsersReadBookService {
  create(createUsersReadBookDto: CreateUsersReadBookDto) {
    return 'This action adds a new usersReadBook';
  }

  findAll() {
    return `This action returns all usersReadBook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersReadBook`;
  }

  update(id: number, updateUsersReadBookDto: UpdateUsersReadBookDto) {
    return `This action updates a #${id} usersReadBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersReadBook`;
  }
}
