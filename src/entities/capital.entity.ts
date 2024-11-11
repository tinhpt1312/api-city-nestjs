import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users, CityFacility, District, Country } from './index';
import { TimestampImpl } from './common/timestamp.impl';

@Entity({ schema: 'public', name: 'capitals' })
export class Capital {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    unique: true,
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => Users, (users) => users.capital)
  users: Users[];

  @OneToOne(() => Country, (country) => country.capital, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  country: Country;

  @OneToMany(() => District, (districts) => districts.capital)
  districts: District[];

  @OneToMany(() => CityFacility, (cityfacilities) => cityfacilities.capitals)
  cityfacilities: CityFacility[];

  @Column(() => TimestampImpl, { prefix: false })
  timestamp!: TimestampImpl;

  constructor() {
    this.timestamp = new TimestampImpl();
  }
}
