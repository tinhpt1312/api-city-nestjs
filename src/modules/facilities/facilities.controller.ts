import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilitiDto, UpdateFacilitiDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
@ApiTags('Facility')
@Controller('facility')
export class FacilitiesController {
  constructor(private readonly facilityService: FacilitiesService) {}

  @Post()
  create(@Body() createFacilitiDto: CreateFacilitiDto) {
    return this.facilityService.create(createFacilitiDto);
  }

  @Get()
  findAll() {
    return this.facilityService.findAll();
  }

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
