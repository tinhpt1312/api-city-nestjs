import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityFacility } from './city-facility.entity';
import { Users } from './user.entity';

@Entity({ name: 'facilities' })
export class Facility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CityFacility, (cityfacility) => cityfacility.facility)
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
