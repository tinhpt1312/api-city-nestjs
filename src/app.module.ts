import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgeresConfiguration } from './config/db';
import { CapitalModule } from './modules/capital/capital.module';
import { UserModule } from './modules/users/users.module';
import { CityFacilityModule } from './modules/citifacilities/citifacilities.module';
import { CountriesModule } from './modules/countries/countries.module';
import { DistrictModule } from './modules/district/district.module';
import { FacilitiesModule } from './modules/facilities/facilities.module';
import { RolesModule } from './modules/roles/roles.module';
import { RoleToUserModule } from './modules/role-user/roleuser.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
