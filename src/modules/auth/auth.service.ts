import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RuntimeException } from '@nestjs/core/errors/exceptions';
import { ResetPasswordDto, ResgiterUserDto, UpdatePasswordDto } from './dto';
import { RolesService } from '../roles/roles.service';
import { EmailService } from '../email/email.service';
import { Injectable } from '@nestjs/common/decorators';
import { Users } from 'src/entities';
import { BadRequestException } from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly roleService: RolesService,
    private readonly emailService: EmailService,
  ) {
    if (!userService || !jwtService) {
      throw new RuntimeException(
        'UserService and JwtService must not be null.',
      );
    }
  }

  async register(userDto: ResgiterUserDto): Promise<any> {
    const { username, password, email } = userDto;

    const newUser = await this.userService.createUser(
      username,
      password,
      email,
    );

    const guestRole = await this.roleService.findRoleByName('GUEST');
    if (!guestRole) {
      throw new BadRequestException('Role "guest" does not exist');
    }
    await this.roleService.assignRoleToUser(newUser, guestRole);

    await this.emailService.sendUserConfirmation(
      newUser.email,
      newUser.username,
    );

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: guestRole.name,
    };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Users | null> {
    const user = await this.userService.validateUser(username, password);

    if (user) return user;

    return null;
  }

  async login(user: Users) {
    const roles = user.roleUser
      ? user.roleUser.map((roleUser) => roleUser.role.name)
      : [];

    const payload = {
      username: user.username,
      sub: user.id,
      roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async requestPasswordReset(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    const { email } = resetPasswordDto;

    const user = this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const resetToken = this.generateConfirmationCode();

    await this.userService.saveResetToken((await user).id, resetToken);

    await this.emailService.sendPasswordResetEmail(
      (await user).email,
      resetToken,
    );
  }

  private generateConfirmationCode(): string {
    return Math.random().toString(36).substring(2, 8); // tạo mã ngẫu nhiên
  }

  async resetPassword(updatePasswordDto: UpdatePasswordDto): Promise<void> {
    const { confirmationCode, newPassword, confirmPassword } =
      updatePasswordDto;

    const user = await this.userService.findByResetToken(confirmationCode);
    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    await this.userService.updatePassword(user.id, newPassword);

    await this.userService.invalidateResetToken(user.id);
  }
}
