import { Body, Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CatsService } from '../cats/cats.service';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserRole } from './user.enum';

@ApiTags('users')
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
  @ApiQuery({ name: 'role', enum: UserRole, isArray: true })
  @Get('userRole')
  async getUserByRole(
    @Query('role') roleIs: UserRole = UserRole.USER,
    @Res() response: Response,
  ): Promise<void> {
    // use isArray set to true for multiple selection
    console.log(roleIs);
  }
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'array',
        items: { type: 'number' },
      },
    },
  })
  @Get('user-coords')
  async userCoords(@Body() cords: number[][]) {
    console.log('user coordinates');
  }
}
