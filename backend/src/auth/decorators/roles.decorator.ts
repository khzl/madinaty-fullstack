// decorators/roles.decorator.ts
  import { SetMetadata } from '@nestjs/common';
  import { UserRole } from 'src/users/entity/user.entity';
  
  export const ROLES_KEY = 'roles';
  export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);