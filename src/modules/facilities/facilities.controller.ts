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
} from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilitiDto, UpdateFacilitiDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/entities';
import { Request } from 'express';
import { RoleEnum } from 'src/types/auth.type';
import { Public } from '../auth/decorator/skip-auth.decorator';
import { Auth } from '../auth/decorator';

@Auth(RoleEnum.Admin, RoleEnum.Manager)
@ApiTags('Facility')
@Controller('facility')
export class FacilitiesController {
  constructor(private readonly facilityService: FacilitiesService) {}

  @Post()
  create(
    @Body() createFacilitiDto: CreateFacilitiDto,
    @Req() request: Request & { user: Users },
  ) {
    const user = request.user;

    return this.facilityService.create(createFacilitiDto, user);
  }
  @Public()
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: any; total: number; page: number; limit: number }> {
    return this.facilityService.findAll(page, limit);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacilityDto: UpdateFacilitiDto,
    @Req() request: Request & { user: Users },
  ) {
    const user = request.user;

    return this.facilityService.update(+id, updateFacilityDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityService.remove(+id);
  }
}
