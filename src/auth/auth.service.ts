import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async test(): Promise<void> {
    console.log('HELLO FROM THE AUTH SERVICE');
  }

  // this method will be used by localAuthGuard on the route needed to protect locally (against db email-pass)
  async validateAuth({ email, password }: LoginUserDto): Promise<User> {
    //whichever route uses this, it will extract email, password then verify against database
    const user = await this.userRepository.findOne({ where: { email } });
    console.log(`USER`, user);
    if (!user) {
      // throw new BadRequestException('We are unable process your request');
      throw new HttpException('No user has found', HttpStatus.UNAUTHORIZED);
    }

    const isSamePass = await compare(password, user.password);
    if (!isSamePass) {
      throw new HttpException('Stupid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
