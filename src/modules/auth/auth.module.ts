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
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { RolesGuard } from './guards/role.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { DistrictModule } from '../district/district.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.serect,
      signOptions: { expiresIn: '10h' },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => CapitalModule),
    forwardRef(() => RoleToUserModule),
    forwardRef(() => RolesModule),
    forwardRef(() => DistrictModule),
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    LocalStrategy,
    LocalAuthGuard,
    RolesGuard,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
  exports: [TypeOrmModule, JwtModule],
})
export class AuthModule {}
