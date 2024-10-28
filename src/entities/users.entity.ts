import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Capital } from './capital.entity';
import { Role } from './roles.entity';
import { RoleToUser } from './role-user.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  image: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Capital, (capital) => capital.users)
  @JoinColumn()
  capital: Capital;

  @OneToMany(() => RoleToUser, (roleuser) => roleuser.user)
  roleuser: RoleToUser[];
}
