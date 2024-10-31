import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../users/users.service';
import { CapitalModule } from '../capital/capital.module';
import { RoleToUserModule } from '../role-user/roleuser.module';
import { FacilitiesModule } from '../facilities/facilities.module';
import { CityFacilityModule } from '../citifacilities/citifacilities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => RolesModule),
    forwardRef(() => RoleToUserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CapitalModule),
    forwardRef(() => FacilitiesModule),
    forwardRef(() => CityFacilityModule),
  ],
  controllers: [RolesController],
  providers: [RolesService, UserService],
  exports: [TypeOrmModule],
})
export class RolesModule {}
