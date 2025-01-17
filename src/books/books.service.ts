import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>) { }

  async create(createBookDto: CreateBookDto) {
    const existingBook = await this.booksRepository.findOneBy({ name: createBookDto.name })
    if (existingBook) {
      throw new BadRequestException('book name already exists');
    }
    return this.booksRepository.insert(createBookDto);
  }

  async findAll(page: number, pageSize: number) {
    return this.booksRepository.find({ skip: page * pageSize, take: pageSize });
  }

  async findOne(id: number) {
    return this.booksRepository.findOneBy({id});
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.booksRepository.findOneBy({id});
    
    return this.booksRepository.save({...book, ...updateBookDto});
  }

  async remove(id: number) {
    const book = await this.booksRepository.findOneBy({id});

    return this.booksRepository.remove(book);
  }
}
