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
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    unique: true,
    type: 'text',
    nullable: false,
  })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => Users, (users) => users.capital)
  users: Users[];

  @OneToOne(() => Country, (country) => country.capital)
  country: Country;

  @OneToMany(() => District, (distinct) => distinct.capital)
  district: District[];

  @OneToMany(() => CityFacility, (cityfacility) => cityfacility.capital)
  cityfacility: CityFacility[];
}
