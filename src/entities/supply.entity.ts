import { PrinterModel } from '../../types';
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity()
export class SupplyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: PrinterModel,
  })
  model: PrinterModel;

  @Column()
  code: string;
  //@todo rename stores to stored.
  @OneToMany(() => StoreEntity, store => store.supply)
  @JoinColumn()
  stores: StoreEntity[];
}