import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Facility, Capital } from './index';

@Entity({ schema: 'public', name: 'cityfacilities' })
export class CityFacility {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @ManyToOne(() => Facility, (facility) => facility.cityfacilities)
  facility: Facility;

  @ManyToOne(() => Capital, (capital) => capital.cityfacilities)
  @JoinColumn({ name: 'capital_id' })
  capitals: Capital;

  // @Column(() => TimestampImpl, { prefix: false })
  // timestamp!: TimestampImpl;

  // constructor() {
  //   this.timestamp = new TimestampImpl();
  // }
}
