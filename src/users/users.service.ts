import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    console.log('USER: ', userRepo);
  }
  async createUser(createUser: RegisterUserDto): Promise<void> {console.log('logged');}
  async login(createUser: RegisterUserDto): Promise<void> {
    console.log('logged');
  }
}
