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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { RoleEnum } from '../../types/auth.type';
import { Request } from 'express';
import { Users } from '../../entities';
import { Public } from '../auth/decorator/skip-auth.decorator';
import { Auth } from '../auth/decorator';

@Auth(RoleEnum.Admin, RoleEnum.Manager)
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  newUser(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request & { user: Users },
  ) {
    const user = request.user;

    return this.userService.create(createUserDto, user);
  }

  @ApiOperation({
    summary: 'Get list user',
    description: 'Retrieve the list of user',
  })
  @Public()
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: any; total: number; page: number; limit: number }> {
    return this.userService.findAll(page, limit);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request & { user: Users },
  ) {
    const user = request.user;

    return this.userService.update(+id, updateUserDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
