import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authen get Bearer')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
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
          example: 'tititi',
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
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
