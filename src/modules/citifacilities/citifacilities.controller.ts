import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityFacilityService } from './citifacilities.service';
import { CreateCityFacilityDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CityToFacility')
@Controller('citifacilities')
export class CityFacilityController {
  constructor(private readonly cityfacilityService: CityFacilityService) {}

  @Post()
  create(@Body() createCityFacilityDto: CreateCityFacilityDto) {
    return this.cityfacilityService.create(createCityFacilityDto);
  }

  @Get()
  findAll() {
    return this.cityfacilityService.findAll();
  }
}
