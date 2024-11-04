import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Capital, RoleToUser } from './index';
import { TimestampImpl } from './common/timestamp.impl';

@Entity({ schema: 'public', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  image: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true, name: 'reset_token' })
  resetToken: string;

  @ManyToOne(() => Capital, (capital) => capital.users, { nullable: true })
  @JoinColumn()
  capital: Capital;

  @OneToMany(() => RoleToUser, (roleUser) => roleUser.user, { cascade: true })
  roleUser: RoleToUser[];

  @Column(() => TimestampImpl, { prefix: false })
  timestamp!: TimestampImpl;

  constructor() {
    this.timestamp = new TimestampImpl();
  }
}
