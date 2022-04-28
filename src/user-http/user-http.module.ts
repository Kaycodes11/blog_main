import { Module } from '@nestjs/common';
import { UserHttpService } from './user-http.service';
import { UserHttpController } from './user-http.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [UserHttpController],
  providers: [UserHttpService],
})
export class UserHttpModule {}
