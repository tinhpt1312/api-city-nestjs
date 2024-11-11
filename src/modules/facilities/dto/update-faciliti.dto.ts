import { PartialType } from '@nestjs/swagger';
import { CreateFacilitiDto } from './create-faciliti.dto';

export class UpdateFacilitiDto extends PartialType(CreateFacilitiDto) {}
