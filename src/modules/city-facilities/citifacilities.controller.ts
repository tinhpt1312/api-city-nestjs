import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CityFacilityService } from './citifacilities.service';
import { CreateCityFacilityDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/role.guard';
import { RoleEnum } from 'src/types/auth.type';
import { Roles } from '../auth/decorator/roles.decorator';
@ApiBearerAuth()
@Roles(RoleEnum.Admin, RoleEnum.Manager)
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
