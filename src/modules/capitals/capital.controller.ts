import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CapitalService } from './capital.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RoleEnum } from 'src/types/auth.type';
import { CreateCapitalDto, UpdateCapitalDto } from './dto';
import { Auth, Public } from '../auth/decorator';
import { Users } from 'src/entities';

@Auth(RoleEnum.Admin, RoleEnum.Manager)
@ApiTags('Capitals')
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
  @Public()
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: any; total: number; page: number; limit: number }> {
    return this.capitalService.findAll(page, limit);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.capitalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCapitalDto: UpdateCapitalDto,
    @Req() request: Request & { user: Users },
  ) {
    const user = request.user;

    return this.capitalService.update(+id, updateCapitalDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.capitalService.remove(+id);
  }
}
