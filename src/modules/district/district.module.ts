import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from 'src/entities';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { CapitalModule } from '../capital/capital.module';

@Module({
  imports: [TypeOrmModule.forFeature([District]), CapitalModule],
  controllers: [DistrictController],
  providers: [DistrictService],
  exports: [TypeOrmModule],
})
export class DistrictModule {}
