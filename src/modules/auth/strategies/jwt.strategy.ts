import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/users/users.service';
import { RoleToUser } from 'src/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.serect,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByIdWithRoles(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    const roles = user.roleuser.map(
      (roleUser: RoleToUser) => roleUser.role.name,
    );

    return { ...user, roles };
  }
}
