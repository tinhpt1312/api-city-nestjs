import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Capital } from './capital.entity';
import { Role } from './roles.entity';

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

  @ManyToOne(() => Capital, (capital) => capital.users)
  @JoinColumn()
  capital: Capital;

  @ManyToOne(() => Role, (roles) => roles.users)
  @JoinColumn()
  roles: Role[];
}
