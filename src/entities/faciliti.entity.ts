import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CityFacility } from './citifaciliti.entity';

@Entity({ name: 'facilities' })
export class Facility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CityFacility, (cityfacility) => cityfacility.facility)
  cityfacility: CityFacility[];
}
