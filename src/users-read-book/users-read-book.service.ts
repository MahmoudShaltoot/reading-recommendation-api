import { Injectable } from '@nestjs/common';
import { CreateUserReadBookDto } from './dto/create-user-read-book.dto';
import { UpdateUserReadBookDto } from './dto/update-user-read-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReadBook } from './entities/user-read-book.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import * as _ from 'lodash';

@Injectable()
export class UsersReadBookService {
  constructor(
    @InjectRepository(UserReadBook) private usersReadBookRepository: Repository<UserReadBook>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Book) private booksRepository: Repository<Book>
  ) { }

  async create(createUserReadBookDto: CreateUserReadBookDto) {
    const user = await this.usersRepository.findOneBy({ id: createUserReadBookDto.user_id });
    const book = await this.booksRepository.findOneBy({ id: createUserReadBookDto.book_id });

    const rest = _.omit(createUserReadBookDto, ['user_id', 'book_id'])
    return this.usersReadBookRepository.insert({ user, book, ...rest });
  }

  async findAll() {
    return this.usersReadBookRepository.find({ relations: ['user', 'book'] });
  }

  async findOne(id: number) {
    return this.usersReadBookRepository.findOne({ where: { id }, relations: ['user', 'book'] });
  }

  async update(id: number, updateUserDto: UpdateUserReadBookDto) {
    const userReadBook = await this.usersReadBookRepository.findOneBy({ id });

    return this.usersReadBookRepository.save({ ...userReadBook, ...updateUserDto });
  }

  async remove(id: number) {
    const userReadBook = await this.usersReadBookRepository.findOneBy({ id });

    return this.usersReadBookRepository.remove(userReadBook);
  }
}
