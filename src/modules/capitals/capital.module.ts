import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapitalController } from './capital.controller';
import { CapitalService } from './capital.service';
import { FacilitiesModule } from '../facilities/facilities.module';
import { CityFacilityModule } from '../city-facilities/citifacilities.module';
import { AuthModule } from '../auth/auth.module';
import { RoleToUserModule } from '../role-users/roleuser.module';
import { RolesModule } from '../roles/roles.module';
import { UserService } from '../users/users.service';
import { Capital } from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Capital]),
    RolesModule,
    RoleToUserModule,
    forwardRef(() => AuthModule),
    forwardRef(() => FacilitiesModule),
    forwardRef(() => CityFacilityModule),
  ],
  controllers: [CapitalController],
  providers: [CapitalService, UserService],
  exports: [TypeOrmModule],
})
export class CapitalModule {}
