import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  async test(): Promise<void> {
    console.log('HELLO FROM THE CAT SERVICE');
  }
}
