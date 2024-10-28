import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, Role, RoleToUser, Users } from 'src/entities';
import { DeepPartial, In, Repository } from 'typeorm';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Capital) private capitalRepository: Repository<Capital>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(RoleToUser)
    private roleUserRepository: Repository<RoleToUser>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { username, password, email, image, capitalid, roleid } =
      createUserDto;

    const newUser = new Users();
    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    newUser.image = image;

    const capital = await this.capitalRepository.findOneBy({ id: capitalid });
    if (!capital) throw new Error('Capital not found');

    newUser.capital = capital;
    await this.userRepository.save(newUser);

    const roles = await this.roleRepository.findBy({ id: In(roleid) });
    if (roles.length === 0) throw new Error('Roles not found');

    const userRole = roles.map((role) => {
      const roleToUser = new RoleToUser();
      roleToUser.role = role;
      roleToUser.user = newUser;
      return roleToUser;
    });

    await this.roleUserRepository.save(userRole);

    return newUser;
  }

  async findAll() {
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

  async findOne(id: number) {
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
      .where('user.id= :id', { id })
      .getOne();
  }

  async update(
    id: number,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<Users> {
    // const user = await this.userRepository.findOneBy({ id });
    // if (!user) throw new Error('User not found');

    // Object.assign(user, updateUserDto);

    // if (updateUserDto.capitalid) {
    //   const capital = await this.capitalRepository.findOneBy({
    //     id: updateUserDto.capitalid,
    //   });
    //   if (!capital) throw new Error('Capital not found');
    //   user.capital = capital;
    // }

    // await this.userRepository.save(user);

    // if (updateUserDto.roleid) {
    //   await this.roleUserRepository.delete({ user });

    //   const roles = await this.roleRepository.findBy({
    //     id: In(updateUserDto.roleid),
    //   });
    //   if (roles.length === 0) throw new Error('Roles not found');

    //   const userRoles = roles.map((role) => {
    //     const roleToUser = new RoleToUser();
    //     roleToUser.role = role;
    //     roleToUser.user = user;
    //     return roleToUser;
    //   });

    //   await this.roleUserRepository.save(userRoles);
    // }

    // return user;

    const city = await this.findOne(id);

    if (!city) {
      throw new NotFoundException();
    }

    Object.assign(city, updateUserDto);

    return await this.userRepository.save(city);
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error('User not found');

    await this.roleUserRepository.delete({ user });

    await this.userRepository.delete(id);
  }
}
