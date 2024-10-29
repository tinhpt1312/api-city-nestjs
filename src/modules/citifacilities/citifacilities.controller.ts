import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CityFacilityService } from './citifacilities.service';
import { CreateCityFacilityDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('CityToFacility')
@Controller('citifacilities')
export class CityFacilityController {
  constructor(private readonly cityfacilityService: CityFacilityService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post()
  create(@Body() createCityFacilityDto: CreateCityFacilityDto) {
    return this.cityfacilityService.create(createCityFacilityDto);
  }

  @Get()
  findAll() {
    return this.cityfacilityService.findAll();
  }
}
