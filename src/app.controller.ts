import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('try')
  async try(@Res() response: Response) {
    try {
      response.status(200).json({ message: 'test' });
    } catch (e) {
      response.status(e.status || 500).json({ message: e?.message });
    }
  }
}
