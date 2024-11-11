import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleToUser } from './role-user.entity';

@Entity({ schema: 'public',name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => RoleToUser, (roleuser) => roleuser.role)
  roleUser: RoleToUser[];
}
