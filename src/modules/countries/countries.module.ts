import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/entities';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CapitalModule } from '../capital/capital.module';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), CapitalModule],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [TypeOrmModule],
})
export class CountriesModule {}
