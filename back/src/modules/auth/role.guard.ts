import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRoles } from '../user/dto/user.role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly role: UserRoles;

  constructor(role: UserRoles) {
    this.role = role;
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const userRole = ctx.user?.role;

    if (!userRole) {
      throw new Error(
        `User role is not defined. Ensure the user object contains a 'role' property.`,
      );
    }

    if (userRole !== this.role) {
      throw new Error(
        `Access denied. User does not have the required role (${this.role}).`,
      );
    }

    return true;
  }
}

// Define a decorator function that returns the RoleGuard instance
export const Roles = (role: UserRoles) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const guard = new RoleGuard(role);
    Reflect.defineMetadata('guard', guard, target, propertyKey);
  };
};
