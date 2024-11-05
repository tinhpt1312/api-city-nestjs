import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { EmailModule } from './modules/email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailConfiguration, PostgeresConfiguration } from './config';
import { AwsS3Module } from './shared/aws-s3/s3.module';
import { AwsS3Service } from './shared/aws-s3/s3.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgeresConfiguration,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      useClass: EmailConfiguration,
    }),
    CapitalModule,
    UserModule,
    CityFacilityModule,
    CountriesModule,
    DistrictModule,
    FacilitiesModule,
    RolesModule,
    RoleToUserModule,
    EmailModule,
    AuthModule,
    AwsS3Module,
  ],
  controllers: [],
  providers: [UserService, AwsS3Service],
})
export class AppModule {}
