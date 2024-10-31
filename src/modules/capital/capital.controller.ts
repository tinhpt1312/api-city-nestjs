import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CapitalService } from './capital.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Users } from 'src/entities';
import { Roles } from '../auth/decorator/roles.decorator';
import { RoleEnum } from 'src/types/auth.type';
import { SkipJwtAuth } from '../auth/decorator/skip-auth.decorator';
import { CreateCapitalDto, UpdateCapitalDto } from './dto';

@ApiTags('Capital')
@ApiBearerAuth()
@Roles(RoleEnum.Admin, RoleEnum.Manager)
@Controller('capitals')
export class CapitalController {
  constructor(private readonly capitalService: CapitalService) {}

  @Post()
  newCapital(
    @Body() createCapital: CreateCapitalDto,
    @Req() request: Request & { user: Users },
  ) {
    const user = request.user;
    return this.capitalService.newCapital(createCapital, user);
  }

  @SkipJwtAuth()
  @Get()
  findAll() {
    return this.capitalService.findAll();
  }

  @SkipJwtAuth()
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.capitalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCapitalDto: UpdateCapitalDto) {
    return this.capitalService.update(+id, updateCapitalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.capitalService.remove(+id);
  }
}
