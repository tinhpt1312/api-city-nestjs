import { PartialType } from '@nestjs/swagger';
import { CreateCapitalDto } from 'src/modules/capital/dto';

export class UpdateRoleDto extends PartialType(CreateCapitalDto) {}
