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
import { UpdateCapitalDto, CreateCapitalDto } from './dto/index';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/guards/local-auth.guards';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Users } from 'src/entities';

@ApiTags('Capital')
@Controller('capitals')
export class CapitalController {
  constructor(private readonly capitalService: CapitalService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth('access-token')
  newCapital(
    @Body() createCapital: CreateCapitalDto,
    @Req() request: Request & { user: Users },
  ) {
    const user = request.user;
    return this.capitalService.newCapital(createCapital, user);
  }

  @Get()
  findAll() {
    return this.capitalService.findAll();
  }

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
