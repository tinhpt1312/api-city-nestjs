import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { SKIP_JWT_AUTH } from '../decorator/skip-auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    console.log('Request:', request.route.path);

    const isSkipAuth = this.reflector.get<boolean>(
      SKIP_JWT_AUTH,
      context.getHandler(),
    );
    console.log('Skip:', isSkipAuth);

    if (isSkipAuth) return true;

    return super.canActivate(context);
  }
}
