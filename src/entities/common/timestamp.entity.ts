import { CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Users } from '../user.entity';



export abstract class Timestamp{
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
  deletedAt?: Date | null;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'updated_at',
    nullable: true,
    default: null,
  })
  updatedAt?: Date | null;

  @ManyToOne(() => Users)
  @JoinColumn({
    name: 'updated_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_timestamp_updated_by',
  })
  updatedBy?: Users | null;
}