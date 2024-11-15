import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../users/users.service';
import { CapitalModule } from '../capitals/capital.module';
import { RoleToUserModule } from '../role-users/roleuser.module';
import { FacilitiesModule } from '../facilities/facilities.module';
import { CityFacilityModule } from '../city-facilities/citifacilities.module';
import { AwsS3Service } from 'src/shared/aws-s3/s3.service';

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
  providers: [RolesService, UserService, AwsS3Service],
  exports: [TypeOrmModule],
})
export class RolesModule {}
