import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserReadBookDto } from './dto/create-user-read-book.dto';
import { UpdateUserReadBookDto } from './dto/update-user-read-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReadBook } from './entities/user-read-book.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RedisService } from 'src/cache/redis.service';
import { REQUEST } from '@nestjs/core';
import { RecommendedBook } from './interface/recommended-book.interface';
import * as _ from 'lodash';

@Injectable()
export class UsersReadBookService {
  constructor(
    @InjectRepository(UserReadBook) private usersReadBookRepository: Repository<UserReadBook>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @Inject(REQUEST) private request: Record<string, any>,
    private readonly eventEmitter: EventEmitter2,
    private readonly redisService: RedisService,
  ) { }

  async create(createUserReadBookDto: CreateUserReadBookDto) {
    const user = await this.usersRepository.findOneBy({ id: this.request.user.id });    
    const book = await this.booksRepository.findOneBy({ id: createUserReadBookDto.book_id });

    if (createUserReadBookDto.start_page > book.num_of_pages || createUserReadBookDto.start_page > createUserReadBookDto.end_page) {
      throw new BadRequestException('Invalid input');
    }

    const userReadBook = await this.usersReadBookRepository.save({ user, book, ...createUserReadBookDto });

    this.eventEmitter.emitAsync('USER_READ_BOOK', userReadBook)

    return userReadBook;
  }

  async findAll(page: number, pageSize: number) {     
    const reads = await this.usersReadBookRepository.find({ skip: page * pageSize, take: pageSize, relations: ['user', 'book']});
    return reads.map(read => _.omit(read, ['user.password']))
  }

  async findOne(id: number) {
    const read = await this.usersReadBookRepository.findOne({ where: { id }, relations: ['user', 'book'] });
    if (!read) {
      throw new NotFoundException()
    }
    return _.omit(read, ['user.password']);
  }

  async update(id: number, updateUserDto: UpdateUserReadBookDto) {
    const userReadBook = await this.usersReadBookRepository.findOneBy({ id });

    return this.usersReadBookRepository.save({ ...userReadBook, ...updateUserDto });
  }

  async remove(id: number) {
    const userReadBook = await this.usersReadBookRepository.findOneBy({ id });

    // TO-DO
    // Soft delete book then exclude the book from top 5 books 
    return this.usersReadBookRepository.remove(userReadBook);
  }

  /**
   * 
   * @returns Top 5 read books
   */
  async getRecommendedBooks(): Promise<RecommendedBook[]> {
    const bookReadPages = await this.redisService.getSetKeysWithSize();
    
    const sortedBookReadPages = bookReadPages.sort((a , b) => b.size - a.size)
    
    const recommendedBooks: RecommendedBook[] = [];
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
