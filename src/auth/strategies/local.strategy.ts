import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authorizationService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(request: Request, loginUserDto: LoginUserDto): Promise<any> {
    return await this.authorizationService.validateAuth(loginUserDto);
  }
}
