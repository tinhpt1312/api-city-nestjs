import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipJwtAuth } from './decorator/skip-auth.decorator';

@Controller('auth')
@ApiTags('Authen get Bearer')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Endpoint for user login using username and password.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'tinhtut123',
          description: 'User username',
        },
        password: {
          type: 'string',
          example: '123',
          description: 'User password',
        },
      },
    },
  })
  // @UseGuards(LocalAuthGuard)
  @SkipJwtAuth()
  @Post('login')
  async login(
    @Body() { username, password }: { username: string; password: string },
  ) {
    const user = await this.authService.validateUser(username, password);
    return this.authService.login(user);
  }
}
