import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto';
import { RolesGuard } from '../auth/guards/role.guard';
import { RoleEnum } from 'src/types/auth.type';
import { Roles } from '../auth/decorator/roles.decorator';

@ApiBearerAuth()
@Roles(RoleEnum.Admin, RoleEnum.Manager)
@ApiTags('Role')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }
}
