import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, RoleToUser, Users } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(RoleToUser)
    private readonly roleToUserRepository: Repository<RoleToUser>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.roleRepository.create(createRoleDto);

    return await this.roleRepository.save(newRole);
  }

  async findRoleByName(name: string): Promise<Role | undefined> {
    return this.roleRepository.findOne({ where: { name } });
  }

  async assignRoleToUser(user: Users, role: Role): Promise<RoleToUser> {
    const roleToUser = this.roleToUserRepository.create({ user, role });
    return this.roleToUserRepository.save(roleToUser);
  }
}
