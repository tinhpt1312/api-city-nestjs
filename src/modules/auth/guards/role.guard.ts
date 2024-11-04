import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleToUser } from 'src/entities';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { RoleEnum } from '../../../types/auth.type';
import { PUBLIC_KEY } from '../decorator/skip-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const isSkipAuth = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isSkipAuth) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.roleUser) {
      throw new ForbiddenException('Access denied');
    }

    const userRoles = user.roleUser.map(
      (roleUser: RoleToUser) => roleUser.role.name,
    );

    const hasRole = requiredRoles.some((role) =>
      userRoles.includes(role.toUpperCase()),
    );

    if (!hasRole) throw new ForbiddenException('Access denied');

    return hasRole;
  }
}
