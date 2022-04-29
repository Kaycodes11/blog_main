import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // async findUsers(): Promise<User[]> {};
  // async findUserByIdOrEmail(idOrEmail: string): Promise<User> {};



  // async updateUser() {}
  // async deleteUsers() {}
  // async deleteUserById(id:string) {}
}
