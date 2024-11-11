import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { CapitalModule } from '../capitals/capital.module';
import { RoleToUserModule } from '../role-users/roleuser.module';
import { AuthModule } from '../auth/auth.module';
import { FacilitiesModule } from '../facilities/facilities.module';
import { CityFacilityModule } from '../city-facilities/citifacilities.module';
import { RolesModule } from '../roles/roles.module';
import { AwsS3Service } from 'src/shared/aws-s3/s3.service';
import { AwsS3Module } from 'src/shared/aws-s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => RolesModule),
    forwardRef(() => RoleToUserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CapitalModule),
    forwardRef(() => FacilitiesModule),
    forwardRef(() => CityFacilityModule),
    forwardRef(() => AwsS3Module),
  ],
  controllers: [UserController],
  providers: [UserService, AwsS3Service],
  exports: [TypeOrmModule],
})
export class UserModule {}
