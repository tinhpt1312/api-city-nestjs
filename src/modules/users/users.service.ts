import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, Role, RoleToUser, Users } from 'src/entities';
import { Repository, In } from 'typeorm';
import { CreateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

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

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { username, password, email, image, capitalid, roleid } =
      createUserDto;

    const capital = await this.findCapitalById(capitalid);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      image,
      capital,
    });
    await this.userRepository.save(newUser);

    const roles = await this.findRolesByIds(roleid);

    const userRoles = roles.map((role) => ({
      role,
      user: newUser,
    }));

    await this.roleUserRepository.save(userRoles);

    return newUser;
  }

  async findAll(): Promise<Users[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.capital', 'capital')
      .leftJoinAndSelect('user.roleuser', 'roleuser')
      .leftJoinAndSelect('roleuser.role', 'role')
      .addSelect([
        'user.id',
        'user.username',
        'user.image',
        'user.email',
        'capital.name',
        'role.name',
      ])
      .getMany();
  }

  async findOne(id: number): Promise<Users | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.capital', 'capital')
      .leftJoinAndSelect('user.roleuser', 'roleuser')
      .leftJoinAndSelect('roleuser.role', 'role')
      .addSelect([
        'user.id',
        'user.username',
        'user.image',
        'user.email',
        'capital.name',
        'role.name',
      ])
      .where('user.id = :id', { id })
      .getOne();

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user;
  }

  async findByUserName(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async update(
    id: number,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<Users> {
    const existingUser = await this.findOne(id);

    const updatedUser = this.userRepository.merge(existingUser, updateUserDto);

    return await this.userRepository.save(updatedUser);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    await this.roleUserRepository.delete({ user });

    await this.userRepository.delete(id);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUserName(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
