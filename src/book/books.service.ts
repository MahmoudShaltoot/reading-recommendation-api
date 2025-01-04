import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>) { }

  async create(CreateBookDto: CreateBookDto) {
    return this.booksRepository.insert(CreateBookDto);
  }

  async findAll() {
    return this.booksRepository.find();
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
