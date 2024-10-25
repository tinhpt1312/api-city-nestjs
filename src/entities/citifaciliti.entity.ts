import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Facility } from './faciliti.entity';
import { Capital } from './capital.entity';

@Entity({ name: 'cityfacilities' })
export class CityFacility {
  @PrimaryGeneratedColumn({
    name: 'citytofacility_id',
  })
  cityToFacilityId: number;

  @ManyToOne(() => Facility, (facility) => facility.cityfacility)
  facility: Facility;

  @ManyToOne(() => Capital, (capital) => capital.cityfacility)
  capital: Capital;
}
