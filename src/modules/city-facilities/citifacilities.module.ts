import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityFacility } from 'src/entities';
import { CityFacilityService } from './citifacilities.service';
import { CityFacilityController } from './citifacilities.controller';
import { CapitalModule } from '../capitals/capital.module';
import { FacilitiesModule } from '../facilities/facilities.module';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { RoleToUserModule } from '../role-users/roleuser.module';
import { UserService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityFacility]),
    forwardRef(() => RolesModule),
    forwardRef(() => RoleToUserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CapitalModule),
    forwardRef(() => FacilitiesModule),
    forwardRef(() => CityFacilityModule),
  ],
  controllers: [CityFacilityController],
  providers: [CityFacilityService, UserService],
  exports: [TypeOrmModule],
})
export class CityFacilityModule {}
