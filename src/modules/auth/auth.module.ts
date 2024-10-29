import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserService } from '../users/users.service';
import { UserModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities';
import { CapitalModule } from '../capital/capital.module';
import { RoleToUserModule } from '../role-user/roleuser.module';
import { RolesModule } from '../roles/roles.module';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.serect,
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => CapitalModule),
    forwardRef(() => RoleToUserModule),
    forwardRef(() => RolesModule),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    LocalAuthGuard,
    LocalStrategy,
  ],
  controllers: [AuthController],
  exports: [TypeOrmModule],
})
export class AuthModule {}
