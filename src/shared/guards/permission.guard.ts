// import { TPermission } from "../../users/entities/user.entity";
// import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
// import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
//
// const PermissionGuard = (permission: TPermission): Type<CanActivate> => {
//   class PermssionGuardMixin extends JwtAuthGuard {
//     async canActivate(context: ExecutionContext) {
//       await super.canActivate(context);
//       const request = context.switchToHttp().getRequest<Request>();
//       const user = request.user;
//
//       return user?.permissions.includes(permission);
//     }
//   }
//   return mixin(PermssionGuardMixin);
// }
//
// export default  PermissionGuard;