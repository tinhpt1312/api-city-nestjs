import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Country } from './countries.entity';
import { District } from './district.entity';
import { CityFacility } from './citifaciliti.entity';

@Entity({ name: 'capital' })
export class Capital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  active: string;

  @OneToMany(() => Users, (users) => users.capital)
  users: Users[];

  @OneToOne(() => Country, (country) => country.capital)
  country: Country;

  @OneToMany(() => District, (distinct) => distinct.capital)
  district: District[];

  @OneToMany(() => CityFacility, (cityfacility) => cityfacility.facility)
  cityfacility: CityFacility[];
}
