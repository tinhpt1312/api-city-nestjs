import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Facility } from './faciliti.entity';
import { Capital } from './capital.entity';

@Entity({ name: 'cityfacilities' })
export class CityFacility {
  @ManyToOne(() => Facility, (facility) => facility.cityfacility)
  facility: Facility;

  @ManyToOne(() => Capital, (capital) => capital.cityfacility)
  capital: Capital;
}