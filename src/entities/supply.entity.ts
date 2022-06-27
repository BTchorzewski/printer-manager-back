import { PrinterModel } from '../../types';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity()
export class SupplyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  model: PrinterModel;

  @Column()
  code: string;

  @OneToMany(() => StoreEntity, store => store.id)
  stores: StoreEntity[];
}