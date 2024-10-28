import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.roleRepository.create(createRoleDto);

    return await this.roleRepository.save(newRole);
  }
}
