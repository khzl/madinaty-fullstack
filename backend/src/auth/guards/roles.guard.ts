// guards/roles.guard.ts
  import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { UserRole } from 'src/users/entity/user.entity';
  import { ROLES_KEY } from '../decorators/roles.decorator';
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {

      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (!requiredRoles) {
        return true;
      }
  
      const { user } = context.switchToHttp().getRequest();

      const userRole = (user as {role: UserRole}).role;

      return requiredRoles.includes(userRole);
    }
  }