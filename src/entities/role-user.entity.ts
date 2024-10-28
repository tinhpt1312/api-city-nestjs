import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './roles.entity';
import { Users } from './users.entity';

@Entity({ name: 'roletouser' })
export class RoleToUser {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  roleUserId: number;

  @ManyToOne(() => Role, (role) => role.roleuser)
  role: Role;

  @ManyToOne(() => Users, (user) => user.roleuser)
  user: Users;
}
