import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/users/users.service';
import { RoleToUser, Users } from 'src/entities';
import { ConfigService } from '@nestjs/config';


interface JwtPayload {
  sub: number; // user ID
  username: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private userService: UserService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<Users & { roles: string[] }> {
    const user = await this.userService.findByIdWithRoles(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    const roles = user.roleUser.map(
      (roleUser: RoleToUser) => roleUser.role.name,
    );

    return { ...user, roles };
  }
}
