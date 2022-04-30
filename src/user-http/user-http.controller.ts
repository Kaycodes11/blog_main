import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Controller('user-http')
export class UserHttpController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    // console.log(`USER_CONTROLLER`, userRepository);
  }
}
