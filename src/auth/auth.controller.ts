import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: [RegisterUserDto] })
  @Get('bulkRegistrations')
  async bulkRegister(@Body() registerDto: RegisterUserDto[]): Promise<void> {
    console.log('The bulk user registration');
  }

  @Post('register')
  async registerWithEmailAndPassword(
    @Body() registerDto: RegisterUserDto,
    @Res() response: Response,
  ): Promise<void> {
    try {
      await this.authService.registerWithEmailAndPassword(registerDto);
      response.json({ message: 'Registration successful' });
    } catch (e) {
      response
        .status(e?.status || 500)
        .json({ message: e?.message || 'Unable to process your request' });
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginWithEmailAndPassword(
    @Body() loginUserDto: LoginUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const { accessToken, isTermsAndConditionsAccepted } =
        await this.authService.genTokenWhenLogin(
          request?.user as unknown as User,
        );
      response.json({
        message: 'login successful',
        data: { accessToken, isTermsAndConditionsAccepted },
      });
    } catch (e) {
      response
        .status(e?.status || 500)
        .json({ message: e?.message || 'Unable to process your request' });
    }
  }
}
