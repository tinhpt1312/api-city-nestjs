import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District, Users } from 'src/entities';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { CapitalModule } from '../capital/capital.module';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { RoleToUserModule } from '../role-user/roleuser.module';
import { FacilitiesModule } from '../facilities/facilities.module';
import { CityFacilityModule } from '../citifacilities/citifacilities.module';
import { UserService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([District]),
    forwardRef(() => RolesModule),
    forwardRef(() => RoleToUserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CapitalModule),
    forwardRef(() => FacilitiesModule),
    forwardRef(() => CityFacilityModule),
  ],
  controllers: [DistrictController],
  providers: [DistrictService, UserService],
  exports: [TypeOrmModule],
})
export class DistrictModule {}
