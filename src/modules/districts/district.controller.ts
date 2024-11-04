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
  UseGuards,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto, UpdateDistrictDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/entities';
import { Request } from 'express';
import { RoleEnum } from 'src/types/auth.type';
import { Public } from '../auth/decorator/skip-auth.decorator';
import { Auth } from '../auth/decorator';

@Auth(RoleEnum.Admin, RoleEnum.Manager)
@ApiTags('Districts')
@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  create(
    @Body() createDistricDto: CreateDistrictDto,
    @Req() request: Request & { user: Users },
  ) {
    const user = request.user;

    return this.districtService.create(createDistricDto, user);
  }

  @Public()
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: any; total: number; page: number; limit: number }> {
    return this.districtService.findAll(page, limit);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
    @Req() request: Request & { user: Users },
  ) {
    const user = request.user;
    return this.districtService.update(+id, updateDistrictDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}
