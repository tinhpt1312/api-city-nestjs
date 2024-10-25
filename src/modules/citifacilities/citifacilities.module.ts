import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityFacility } from 'src/entities';
import { CityFacilityService } from './citifacilities.service';
import { CityFacilityController } from './citifacilities.controller';
import { CapitalModule } from '../capital/capital.module';
import { FacilitiesModule } from '../facilities/facilities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityFacility]),
    forwardRef(() => CapitalModule),
    forwardRef(() => FacilitiesModule),
  ],
  controllers: [CityFacilityController],
  providers: [CityFacilityService],
  exports: [TypeOrmModule],
})
export class CityFacilityModule {}
