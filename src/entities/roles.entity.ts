import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { RoleToUser } from './role-user.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => RoleToUser, (roleuser) => roleuser.role)
  roleuser: RoleToUser[];
}
