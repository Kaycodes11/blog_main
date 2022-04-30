import { CanActivate, ExecutionContext, Injectable, Type, mixin } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../entities/role.entity';
import { Request } from "express";

export const RolesGuard = (role: UserRoles[]): Type<CanActivate> => {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>();
      const user: any = request?.user;
      return user?.roles?.include(role)
    }
  }
  return mixin(RolesGuardMixin)
}

/*
now for example take post.controller.ts
@Delete(":id")
@UseGuards(RolesGuard(UserRoles.USER))
@UseGuards(JwtAuthGuard)
async deletePost(){}
* */

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
//
//   // canActivate(context: ExecutionContext): boolean {
//   //   // get the decorator metadata from the request
//   //   const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
//   //     this.ROLES_KEY,
//   //     [context.getHandler(), context.getClass()],
//   //   );
//   //   if (!requiredRoles) {
//   //     return true;
//   //   }
//   //   const { user } = context.switchToHttp().getRequest();
//   //   return requiredRoles.some((role) => user.roles?.includes(role));
//   // }
//
//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<UserRoles[]>(
//       'roles',
//       context.getHandler(),
//     );
//     // does it have any role?
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest<Request>();
//     const user = request.user;
//     // return matchRoles(roles, user.roles);
//     return true;
//   }
// }

// now, apply on global app.useGlobalGuards(new RolesGuard),
// or controller/method level @UseGuards(RolesGuard); here nestjs will instantiate it else new RolesGuard() manually
// or at that controller's module like providers: [{ provide: "APP_GUARD", useClass: RolesGuard }]
// another thing about using at modular level, it allows to inject dependency
