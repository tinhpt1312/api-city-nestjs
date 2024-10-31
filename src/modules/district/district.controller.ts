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
import { DistrictService } from './district.service';
import { CreateDistrictDto, UpdateDistrictDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/entities';
import { Request } from 'express';
import { Roles } from '../auth/decorator/roles.decorator';
import { RoleEnum } from 'src/types/auth.type';
import { RolesGuard } from '../auth/guards/role.guard';
import { SkipJwtAuth } from '../auth/decorator/skip-auth.decorator';

@ApiBearerAuth()
@Roles(RoleEnum.Admin, RoleEnum.Manager)
@ApiTags('District')
@Controller('district')
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

  @SkipJwtAuth()
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @SkipJwtAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}
