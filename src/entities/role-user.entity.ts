import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role, Users } from './index';

@Entity({ schema: 'public', name: 'role_users' })
export class RoleToUser {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @ManyToOne(() => Role, (role) => role.roleUser)
  @JoinColumn({
    name: 'role_id',
  })
  role: Role;

  @ManyToOne(() => Users, (user) => user.roleUser)
  @JoinColumn({
    name: 'user_id',
  })
  user: Users;
}
