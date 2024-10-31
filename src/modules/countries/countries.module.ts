import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/entities';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CapitalModule } from '../capitals/capital.module';
import { UserService } from '../users/users.service';
import { UserModule } from '../users/users.module';
import { RoleToUserModule } from '../role-users/roleuser.module';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country]),
    CapitalModule,
    UserModule,
    RolesModule,
    RoleToUserModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [CountriesController],
  providers: [CountriesService, UserService],
  exports: [TypeOrmModule],
})
export class CountriesModule {}
