import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleToUser } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class RoleToUserService {
  constructor(
    @InjectRepository(RoleToUser)
    private roleToUserRepository: Repository<RoleToUser>,
  ) {}
}
