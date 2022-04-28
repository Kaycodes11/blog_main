// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { Request } from 'express';
// import { AuthService } from '../auth.service';
//
// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authorizationService: AuthService) {
//     super({ usernameField: 'email', passReqToCallback: true });
//   }
//
//   async validate(
//     request: Request,
//     email: string,
//     password?: string,
//   ): Promise<any> {
//     // const platform = request?.body?.platform;
//     return await this.authorizationService.validateAuth(email, password);
//   }
// }
