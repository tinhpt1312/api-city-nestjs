import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Capital } from './capital.entity';
import { Users } from './user.entity';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToOne(() => Capital)
  @JoinColumn({ name: 'capitalid' })
  capital: Capital;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'create_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date | null;

  @ManyToOne(() => Users)
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_timestamp_created_by',
  })
  createdBy?: Users | null;

  @DeleteDateColumn({
    name: 'delete_at',
  })
  deleteAt?: Date | null;
}
