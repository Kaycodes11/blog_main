import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { MailService } from '../mail/mail.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

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
    private readonly mailService: MailService,
  ) {
    // console.log('USER_AUTH', userService);
  }

  async test(): Promise<void> {
    console.log('HELLO FROM THE AUTH SERVICE');
  }

  async registerWithEmailAndPassword({
    password,
    ...rest
  }: RegisterUserDto): Promise<void> {
    const isUser = await this.userRepository.findOne({
      where: { email: rest?.email },
    });

    if (isUser) {
      throw new ConflictException('Duplicate signup');
    }
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    const user: User = await this.userRepository.create({
      password: passwordHash,
      ...rest,
    });
    const saved = await this.userRepository.save(user);
    // console.log(`saved `, saved);
    //  now send the confirmation email
    const randomToken = Math.floor(1000 + Math.random() * 9000).toString();
    // this email for just confirming newly registered users
    await this.mailService.sendUserConfirmationMail(saved, randomToken);
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

    // const isPlainPasswordSame = user.password === password;
    const isSamePass = await compare(password, user.password);
    // console.log(isSamePass);
    if (!isSamePass) {
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async forgotPassword({ email }: ForgotPasswordDto): Promise<void> {
    console.log(`forgotten password`);
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException('No Such user exist');
    }
    //  now then send a mail with the instruction to follow to reset password/set a new password
    const randomToken = Math.floor(1000 + Math.random() * 9000).toString();
    await this.mailService.resetPasword(user, randomToken);
  }
}
