import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleEnum } from 'src/types/auth.type';
import { Roles } from './roles.decorator';

export function Auth(...roles: RoleEnum[]) {
  return applyDecorators(ApiBearerAuth(), Roles(...roles));
}
