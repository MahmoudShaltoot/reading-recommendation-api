import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValid: boolean = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      throw new BadRequestException('Incorrect password');
    }
    return user;
  }

  async login(user: User) {
    const payload = { id: user.id, username: user.username, isAdmin: user.is_admin };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: CreateUserDto) {
    const existingUser = await this.usersService.findOneByUsername(user.username);
    if (existingUser) {
      throw new BadRequestException('username already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await this.usersService.create({...user, password: hashedPassword});
    return this.login(createdUser);
  }
}
