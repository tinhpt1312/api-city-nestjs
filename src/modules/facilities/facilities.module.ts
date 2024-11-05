import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from 'src/entities';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { CapitalModule } from '../capitals/capital.module';
import { CityFacilityModule } from '../city-facilities/citifacilities.module';
import { RolesModule } from '../roles/roles.module';
import { RoleToUserModule } from '../role-users/roleuser.module';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../users/users.service';
import { AwsS3Service } from 'src/shared/aws-s3/s3.service';

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
  providers: [FacilitiesService, UserService, AwsS3Service],
  exports: [TypeOrmModule],
})
export class FacilitiesModule {}
