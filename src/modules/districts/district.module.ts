import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District, Users } from 'src/entities';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { CapitalModule } from '../capitals/capital.module';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { RoleToUserModule } from '../role-users/roleuser.module';
import { FacilitiesModule } from '../facilities/facilities.module';
import { CityFacilityModule } from '../city-facilities/citifacilities.module';
import { UserService } from '../users/users.service';
import { AwsS3Service } from 'src/shared/aws-s3/s3.service';

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
  providers: [DistrictService, UserService, AwsS3Service],
  exports: [TypeOrmModule],
})
export class DistrictModule {}
