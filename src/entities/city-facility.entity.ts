import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Facility, Capital } from './index';
import { TimestampImpl } from './common/timestamp.impl';

@Entity({ schema: 'public', name: 'cityfacilities' })
export class CityFacility {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @ManyToOne(() => Facility, (facility) => facility.cityfacilities)
  @JoinColumn({ name: 'facility_id' })
  facility: Facility;

  @ManyToOne(() => Capital, (capital) => capital.cityfacilities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'capital_id' })
  capitals: Capital;

  @Column(() => TimestampImpl, { prefix: false })
  timestamp!: TimestampImpl;

  constructor() {
    this.timestamp = new TimestampImpl();
  }
}
