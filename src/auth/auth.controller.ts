import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('test')
  async validUser(@Res() response: Response) {
    response.status(200).json({ message: `authentication test` });
  }
}
