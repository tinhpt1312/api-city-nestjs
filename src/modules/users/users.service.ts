import { InjectRepository } from '@nestjs/typeorm';
import { Capital, Role, RoleToUser, Users } from 'src/entities';
import { Repository, In } from 'typeorm';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common/decorators';
import { NotFoundException } from '@nestjs/common/exceptions';
import { AwsS3Service } from 'src/shared/aws-s3/s3.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    @InjectRepository(Capital)
    private readonly capitalRepository: Repository<Capital>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(RoleToUser)
    private readonly roleUserRepository: Repository<RoleToUser>,

    private readonly awsS3Service: AwsS3Service,
  ) {}

  private async findCapitalById(capitalId: number): Promise<Capital> {
    const capital = await this.capitalRepository.findOneBy({ id: capitalId });

    if (!capital) throw new NotFoundException('Capital not found');

    return capital;
  }

  private async findRolesByIds(roleIds: number[]): Promise<Role[]> {
    const roles = await this.roleRepository.findBy({ id: In(roleIds) });

    if (roles.length === 0) throw new NotFoundException('Roles not found');

    return roles;
  }

  async create(
    createUserDto: CreateUserDto & { image: Express.Multer.File },
    user: Users,
  ): Promise<UserResponseDto> {
    const { username, password, email, capital_id, roleid } = createUserDto;

    const capital = await this.findCapitalById(capital_id);

    const hashedPassword = await bcrypt.hash(password, 10);

    let fileName = null;
    if (createUserDto.image) {
      fileName = await this.awsS3Service.uploadFile(createUserDto.image);
    }

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      image: fileName,
      capital,
    });
    newUser.timestamp.createdBy = user;

    await this.userRepository.save(newUser);

    const roles = await this.findRolesByIds(roleid);

    const userRoles = roles.map((role) => ({
      role,
      user: newUser,
    }));

    await this.roleUserRepository.save(userRoles);

    const userResponse = new UserResponseDto();
    userResponse.id = newUser.id;
    userResponse.username = newUser.username;
    userResponse.email = newUser.email;
    userResponse.createdAt = newUser.timestamp.createdAt;
    userResponse.createdBy = newUser.timestamp.createdBy?.username;

    return userResponse;
  }

  // async create(createUserDto: CreateUserDto, user: Users): Promise<Users> {
  //   const { username, password, email, image, capitalid, roleid } =
  //     createUserDto;

  //   const capital = await this.findCapitalById(capitalid);

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const newUser = this.userRepository.create({
  //     username,
  //     password: hashedPassword,
  //     email,
  //     image,
  //     capital,
  //   });
  //   newUser.timestamp.createdBy = user;

  //   await this.userRepository.save(newUser);

  //   const roles = await this.findRolesByIds(roleid);

  //   const userRoles = roles.map((role) => ({
  //     role,
  //     user: newUser,
  //   }));

  //   await this.roleUserRepository.save(userRoles);

  //   return newUser;
  // }

  async findAll(page: number = 1, limit: number = 10) {
    const [result, total] = await this.userRepository
      .createQueryBuilder('user')
      .where('user.deleted_at is null')
      .leftJoinAndSelect('user.capital', 'capital')
      .leftJoinAndSelect('user.roleUser', 'roleuser')
      .leftJoinAndSelect('roleuser.role', 'role')
      .addSelect(['capital.name', 'role.name'])
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: result,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<Users | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.deleted_at is null')
      .leftJoinAndSelect('user.capital', 'capital')
      .leftJoinAndSelect('user.roleUser', 'roleuser')
      .leftJoinAndSelect('roleuser.role', 'role')
      .addSelect(['capital.name', 'role.name'])
      .where('user.id = :id', { id })
      .getOne();

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user;
  }

  async createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<Users> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
    });
    return this.userRepository.save(newUser);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    user: Users,
  ): Promise<Users> {
    const existingUser = await this.findOne(id);

    Object.assign(existingUser, updateUserDto);

    existingUser.timestamp.updatedAt = new Date();
    existingUser.timestamp.updatedBy = user;

    return await this.userRepository.save(existingUser);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    await this.roleUserRepository.delete({ user });

    await this.userRepository.softDelete(id);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUserName(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async updatePassword(id: number, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.update(id, { password: hashedPassword });
  }

  async invalidateResetToken(id: number): Promise<void> {
    await this.userRepository.update(id, { resetToken: null });
  }

  async saveResetToken(id: number, resetToken: string): Promise<void> {
    await this.userRepository.update(id, { resetToken });
  }

  async findByUserName(username: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findByIdWithRoles(userId: number): Promise<Users> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['roleUser', 'roleUser.role'],
    });
  }

  async findByResetToken(resetToken: string): Promise<Users> {
    return this.userRepository.findOne({ where: { resetToken } });
  }
}
