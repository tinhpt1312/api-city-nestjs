import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './decorator/skip-auth.decorator';
import { ResetPasswordDto, UpdatePasswordDto } from './dto';
import { Body, Controller, Post } from '@nestjs/common/decorators';
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
  @Public()
  @Post('login')
  public async login(
    @Body() { username, password }: { username: string; password: string },
  ) {
    const user = await this.authService.validateUser(username, password);
    return this.authService.login(user);
  }

  @ApiOperation({
    summary: 'Register',
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
        email: {
          type: 'string',
          example: 'email@gmail.com',
          description: 'User email',
        },
      },
    },
  })
  @Public()
  @Post('register')
  async register(@Body() userDto: any) {
    return this.authService.register(userDto);
  }

  @ApiOperation({
    summary: 'Reset Password',
    description: 'forget password and reset password',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        confirmationCode: {
          type: 'string',
          example: 'example code',
          description: 'confirm code',
        },
        newPassword: {
          type: 'string',
          example: '123',
          description: 'newPassword',
        },
        confirmPassword: {
          type: 'string',
          example: '123',
          description: 'confirmPassword',
        },
      },
    },
  })
  @Public()
  @Post('resetpassword')
  async resetPassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.resetPassword(updatePasswordDto);
  }

  @ApiOperation({
    summary: 'Forget password',
    description: 'forget password',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'tinhptps26461@gmail.com',
          description: 'email',
        },
      },
    },
  })
  @Public()
  @Post('forgotpassword')
  async requestPasswordReset(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    return this.authService.requestPasswordReset(resetPasswordDto);
  }
}
