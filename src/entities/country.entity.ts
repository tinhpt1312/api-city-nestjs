import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Capital } from './index';
import { TimestampImpl } from './common/timestamp.impl';

@Entity({ schema: 'public',name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number;

  @Column({ unique: true , type: 'varchar', nullable: false})
  name: string;

  @OneToOne(() => Capital)
  @JoinColumn({ name: 'capital_id' })
  capital: Capital;

  @Column(() => TimestampImpl, { prefix: false })
  timestamp!: TimestampImpl;

  constructor() {
    this.timestamp = new TimestampImpl();
  }
}
