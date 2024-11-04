import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../users/users.service';
import { UserModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities';
import { CapitalModule } from '../capitals/capital.module';
import { RoleToUserModule } from '../role-users/roleuser.module';
import { RolesModule } from '../roles/roles.module';
import { DistrictModule } from '../districts/district.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy, LocalStrategy } from './strategies';
import { JwtAuthGuard, LocalAuthGuard, RolesGuard } from './guards';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesService } from '../roles/roles.service';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
    forwardRef(() => CapitalModule),
    forwardRef(() => RoleToUserModule),
    forwardRef(() => RolesModule),
    forwardRef(() => DistrictModule),
  ],
  providers: [
    RolesService,
    AuthService,
    UserService,
    EmailService,
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
