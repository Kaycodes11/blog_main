import { SetMetadata } from '@nestjs/common';
import { UserRoles } from "../entities/role.entity";

const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
export { Roles };
