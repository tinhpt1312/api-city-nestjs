import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgeresConfiguration } from './config/db';
import { CapitalModule } from './modules/capitals/capital.module';
import { UserModule } from './modules/users/users.module';
import { CityFacilityModule } from './modules/city-facilities/citifacilities.module';
import { CountriesModule } from './modules/countries/countries.module';
import { DistrictModule } from './modules/districts/district.module';
import { FacilitiesModule } from './modules/facilities/facilities.module';
import { RolesModule } from './modules/roles/roles.module';
import { RoleToUserModule } from './modules/role-users/roleuser.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserService } from './modules/users/users.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/guards/role.guard';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgeresConfiguration,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CapitalModule,
    UserModule,
    CityFacilityModule,
    CountriesModule,
    DistrictModule,
    FacilitiesModule,
    RolesModule,
    RoleToUserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}
