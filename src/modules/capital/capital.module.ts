import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Capital } from 'src/entities/index';
import { CapitalController } from './capital.controller';
import { CapitalService } from './capital.service';
import { FacilitiesModule } from '../facilities/facilities.module';
import { CityFacilityModule } from '../citifacilities/citifacilities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Capital]),
    forwardRef(() => FacilitiesModule),
    forwardRef(() => CityFacilityModule),
  ],
  controllers: [CapitalController],
  providers: [CapitalService],
  exports: [TypeOrmModule],
})
export class CapitalModule {}
