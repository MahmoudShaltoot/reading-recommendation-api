import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserReadBookDto } from './dto/create-user-read-book.dto';
import { UpdateUserReadBookDto } from './dto/update-user-read-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReadBook } from './entities/user-read-book.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import * as _ from 'lodash';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RedisService } from 'src/cache/redis.service';

@Injectable()
export class UsersReadBookService {
  constructor(
    @InjectRepository(UserReadBook) private usersReadBookRepository: Repository<UserReadBook>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    private readonly eventEmitter: EventEmitter2,
    private readonly redisService: RedisService,
  ) { }

  async create(createUserReadBookDto: CreateUserReadBookDto) {
    const user = await this.usersRepository.findOneBy({ id: createUserReadBookDto.user_id });
    const book = await this.booksRepository.findOneBy({ id: createUserReadBookDto.book_id });

    if (createUserReadBookDto.start_page > createUserReadBookDto.end_page)
      throw new BadRequestException('Start page must be less than end page');

    const rest = _.omit(createUserReadBookDto, ['user_id', 'book_id'])
    const userReadBook = await this.usersReadBookRepository.save({ user, book, ...rest });

    this.eventEmitter.emitAsync('USER_READ_BOOK', userReadBook)

    return userReadBook;
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

  async getRecommendedBooks() {
    const bookReadPages = await this.redisService.getSetKeysWithSize();
    
    const sortedBookReadPages = bookReadPages.sort((a , b) => b.size - a.size)
    
    const recommendedBooks = [];
    for (let i = 0; i < 5 && i < sortedBookReadPages.length; i++) {
      const book = await this.booksRepository.findOneBy({id: Number(sortedBookReadPages[i].key)})
      recommendedBooks.push({
        book_id: book.id,
        book_name: book.name,
        num_of_pages: book.num_of_pages,
        num_of_read_pages: sortedBookReadPages[i].size
      })
    }

    return recommendedBooks;
  }
}
