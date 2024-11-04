import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Capital } from './index';
import { TimestampImpl } from './common/timestamp.impl';

@Entity({ schema: 'public',name: 'districts' })
export class District {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number;

  @Column({ unique: true, type: 'varchar', nullable: false })
  name: string;

  @ManyToOne(() => Capital, (capital) => capital.districts)
  capital: Capital;

  @Column(() => TimestampImpl, { prefix: false })
  timestamp!: TimestampImpl;

  constructor() {
    this.timestamp = new TimestampImpl();
  }
}
