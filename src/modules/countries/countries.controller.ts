import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common/decorators';
import { CountriesService } from './countries.service';
import { CreateCountryDto, UpdateCountryDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/entities';
import { Request } from 'express';
import { RoleEnum } from 'src/types/auth.type';
import { Auth, Public } from '../auth/decorator';

@Auth(RoleEnum.Admin, RoleEnum.Manager)
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
  @Public()
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: any; total: number; page: number; limit: number }> {
    return this.countryService.findAll(page, limit);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
    @Req() request: Request & { user: Users },
  ) {
    const user = request.user;

    return this.countryService.update(+id, updateCountryDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(+id);
  }
}
