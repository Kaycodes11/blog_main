import { Module } from '@nestjs/common';
import { UserHttpService } from './user-http.service';
import { UserHttpController } from './user-http.controller';

@Module({
  providers: [UserHttpService],
  controllers: [UserHttpController]
})
export class UserHttpModule {}
