import { Body, Controller, Get, Post } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  create(@Body() createDistricDto: CreateDistrictDto) {
    return this.districtService.create(createDistricDto);
  }

  @Get()
  findAll() {
    return this.districtService.findAll();
  }
}
