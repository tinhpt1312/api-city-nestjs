import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from 'src/entities';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { CapitalModule } from '../capital/capital.module';
import { CityFacilityModule } from '../citifacilities/citifacilities.module';
import { UserModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { RoleToUserModule } from '../role-user/roleuser.module';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Facility]),
    RolesModule,
    RoleToUserModule,
    forwardRef(() => AuthModule),
    forwardRef(() => CapitalModule),
    forwardRef(() => FacilitiesModule),
    forwardRef(() => CityFacilityModule),
  ],
  controllers: [FacilitiesController],
  providers: [FacilitiesService, UserService],
  exports: [TypeOrmModule],
})
export class FacilitiesModule {}
