import { PartialType } from '@nestjs/swagger';
import { CreateCapitalDto } from './create-capital.dto';

export class UpdateCapitalDto extends PartialType(CreateCapitalDto) {}
