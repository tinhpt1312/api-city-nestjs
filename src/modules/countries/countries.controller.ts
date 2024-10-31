import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto, UpdateCountryDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/entities';
import { Request } from 'express';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RoleEnum } from 'src/types/auth.type';
import { SkipJwtAuth } from '../auth/decorator/skip-auth.decorator';

@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(RoleEnum.Admin, RoleEnum.Manager)
@ApiTags('Country')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countryService: CountriesService) {}

  @Post()
  create(
    @Body() createCountryDto: CreateCountryDto,
    @Req() request: Request & { user: Users },
  ) {
    const user = request.user;

    return this.countryService.create(createCountryDto, user);
  }

  @SkipJwtAuth()
  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @SkipJwtAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(+id);
  }
}
