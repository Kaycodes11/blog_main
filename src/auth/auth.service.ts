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
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';

type LoginToken = {
  accessToken: string;
  roles?: string | string[];
  isTermsAndConditionsAccepted?: boolean;
  platformIs?: 'web' | 'mobile';
  isBlockedByAdmin?: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    // console.log('USER_AUTH', userService);
  }

  async test(): Promise<void> {
    console.log('HELLO FROM THE AUTH SERVICE');
  }

  async registerWithEmailAndPassword(
    registerDto: RegisterUserDto,
  ): Promise<void> {
    const isUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (isUser) {
      throw new BadRequestException('Such user already exist');
    }
    const user: User = await this.userRepository.create(registerDto);
    await this.userRepository.save(user);
  }

  async genTokenWhenLogin({ id, email }: User): Promise<LoginToken> {
    const payload = { id, email };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      }),
      isTermsAndConditionsAccepted: true,
    };
  }

  // this method will be used by localAuthGuard on the route needed to protect locally (against db email-pass)
  async validateAuth(
    email: string,
    password: string,
    platform?: string,
  ): Promise<User> {
    //whichever route uses this, it will extract email, password then verify against database
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      // throw new BadRequestException('We are unable process your request');
      throw new HttpException('No user has found', HttpStatus.UNAUTHORIZED);
    }

    // const isSamePass = await compare(password, user.password);
    const isPlainPasswordSame = user.password === password;
    // console.log(isPlainPasswordSame);
    if (!isPlainPasswordSame) {
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  // async reset (): Promise(void) {}
  // async forgotPassword(): Promise<void> {}
}
