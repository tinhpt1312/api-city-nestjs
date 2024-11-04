import { PartialType } from '@nestjs/swagger';
import { CreateCapitalDto } from 'src/modules/capitals/dto';

export class UpdateRoleDto extends PartialType(CreateCapitalDto) {}
