import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CapitalService } from './capital.service';
import { UpdateCapitalDto, CreateCapitalDto } from './dto/index';

@Controller('capital')
export class CapitalController {
  constructor(private readonly capitalService: CapitalService) {}

  @Post()
  newCapital(@Body() createCapital: CreateCapitalDto) {
    return this.capitalService.newCapital(createCapital);
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
