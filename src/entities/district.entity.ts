import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Capital } from './capital.entity';

@Entity({ name: 'district' })
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Capital, (capital) => capital.district)
  capital: Capital;
}