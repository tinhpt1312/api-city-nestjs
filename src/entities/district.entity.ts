import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Capital } from './capital.entity';
import { Users } from './user.entity';

@Entity({ name: 'district' })
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Capital, (capital) => capital.district)
  capital: Capital;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
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
    name: 'deleted_at',
  })
  deleteAt?: Date | null;
}
