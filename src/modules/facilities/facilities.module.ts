import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from 'src/entities';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { CapitalModule } from '../capital/capital.module';
import { CityFacilityModule } from '../citifacilities/citifacilities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Facility])],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
  exports: [TypeOrmModule],
})
export class FacilitiesModule {}
