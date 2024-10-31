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
import { FacilitiesService } from './facilities.service';
import { CreateFacilitiDto, UpdateFacilitiDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/entities';
import { Request } from 'express';
import { Roles } from '../auth/decorator/roles.decorator';
import { RoleEnum } from 'src/types/auth.type';
import { SkipJwtAuth } from '../auth/decorator/skip-auth.decorator';

@ApiTags('Facility')
@ApiBearerAuth()
@Roles(RoleEnum.Admin, RoleEnum.Manager)
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
  @SkipJwtAuth()
  @Get()
  findAll() {
    return this.facilityService.findAll();
  }

  @SkipJwtAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacilityDto: UpdateFacilitiDto,
  ) {
    return this.facilityService.update(+id, updateFacilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityService.remove(+id);
  }
}
