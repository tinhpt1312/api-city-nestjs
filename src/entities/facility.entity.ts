import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityFacility } from './index';
import { TimestampImpl } from './common/timestamp.impl';

@Entity({ schema: 'public',name: 'facilities' })
export class Facility {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number;

  @Column({nullable: false, type:'varchar'})
  name: string;

  @OneToMany(() => CityFacility, (cityfacilities) => cityfacilities.facility)
  cityfacilities: CityFacility[];

  @Column(() => TimestampImpl, { prefix: false })
  timestamp!: TimestampImpl;

  constructor() {
    this.timestamp = new TimestampImpl();
  }
}
