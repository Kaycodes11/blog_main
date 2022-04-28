import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    console.log(`USER_CONT`, userRepository);
  }
  @Get('test')
  async validUser(@Res() response: Response) {
    response.status(200).json({ message: `authentication test` });
  }
}
