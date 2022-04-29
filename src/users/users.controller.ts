import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { UsersService } from './users.service';
import { CatsService } from '../cats/cats.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly catService: CatsService,
  ) {}

  @Get('seed')
  async test(@Res() response: Response) {
    // await this.authService.validateAuth();
    await this.catService.test();
    response.status(200).json({ message: 'user test for seeding' });
  }
}
