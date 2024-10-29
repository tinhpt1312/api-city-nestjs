import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { CapitalModule } from '../capital/capital.module';
import { RolesModule } from '../roles/roles.module';
import { RoleToUserModule } from '../role-user/roleuser.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    CapitalModule,
    RolesModule,
    RoleToUserModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
