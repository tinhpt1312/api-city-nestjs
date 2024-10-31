import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Country } from './country.entity';
import { District } from './district.entity';
import { CityFacility } from './city-facility.entity';

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

  @OneToOne(() => Country, (country) => country.capital, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  country: Country;

  @OneToMany(() => District, (distinct) => distinct.capital)
  district: District[];

  @OneToMany(() => CityFacility, (cityfacility) => cityfacility.capital)
  cityfacility: CityFacility[];

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date | null;

  @ManyToOne(() => Users)
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_timestamp_created_by',
  })
  createdBy?: Users | null;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deleteAt?: Date | null;
}
