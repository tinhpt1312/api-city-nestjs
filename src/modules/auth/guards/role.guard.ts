import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleToUser } from 'src/entities';
import { UserService } from 'src/modules/users/users.service';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { RoleEnum } from '../../../types/auth.type';
import { SKIP_JWT_AUTH } from '../decorator/skip-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('RequiredRoles: ', requiredRoles);
    if (!requiredRoles) return true;

    const isSkipAuth = this.reflector.get<boolean>(
      SKIP_JWT_AUTH,
      context.getHandler(),
    );

    if (isSkipAuth) return true;

    const { user } = context.switchToHttp().getRequest();

    console.log('Users: ', user);

    if (!user || !user.roleuser) {
      throw new ForbiddenException('Access denied');
    }

    const userRoles = user.roleuser.map(
      (roleUser: RoleToUser) => roleUser.role.name,
    );

    const hasRole = requiredRoles.some((role) =>
      userRoles.includes(role.toUpperCase()),
    );
    if (!hasRole) throw new ForbiddenException('Access denied');

    return hasRole;
  }
}
