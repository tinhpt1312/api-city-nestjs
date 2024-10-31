import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Capital } from './capital.entity';
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

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deleteAt?: Date | null;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date | null;
}
