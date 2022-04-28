import { Body, Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('seed')
  async test(@Res() response: Response) {
    response.status(200).json({ message: 'user test for seeding' });
  }

  async register(
    @Body() createUserDto: RegisterUserDto,
    @Res() response: Response,
  ) {
    try {
      await this.userService.createUser(createUserDto);
      response
        .status(201)
        .json({ message: 'new user has registered successfully' });
    } catch (e) {
      response.status(e?.status || 500).json({ message: e?.message });
    }
  }
}
