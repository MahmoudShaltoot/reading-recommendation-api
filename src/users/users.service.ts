import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async findAll(page, page_size) {
    const users = await this.usersRepository.find({ skip: page * page_size, take: page_size });
    return users.map(user => plainToClass(UserDto, user, { excludeExtraneousValues: true }))
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({id});
    return plainToClass(UserDto, user, { excludeExtraneousValues: true });
  }

  async findOneByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  // TO-DO
  // Owner guard
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.usersRepository.save({...user, ...updateUserDto});
    return plainToClass(UpdateDto, updatedUser, { excludeExtraneousValues: true });
  }

  // TO-DO
  // Owner guard
  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const removedUser = await this.usersRepository.remove(user);
    return plainToClass(UserDto, removedUser, { excludeExtraneousValues: true });
  }
}
