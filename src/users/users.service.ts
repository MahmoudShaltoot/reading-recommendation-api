import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async findAll(page, page_size) {
    return this.usersRepository.find({ skip: page * page_size, take: page_size, select: ['id', 'full_name', 'created_at', 'updated_at', 'is_admin'] });
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({id});
  }

  async findOneByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  // TO-DO
  // Owner guard
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({id});
    
    return this.usersRepository.save({...user, ...updateUserDto});
  }

  // TO-DO
  // Owner guard
  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({id});

    // TO-DO
    // Soft delete
    return this.usersRepository.remove(user);
  }
}
