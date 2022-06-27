import { PrinterModel } from '../../types';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SupplyEntity } from './supply.entity';

@Entity()
export class PrinterEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 5 })
  name: string;

  @Column({
    type: 'enum',
    enum: PrinterModel,
  })
  model: PrinterModel;

  @Column({ length: 16 })
  ip: string;

  @Column()
  isMultifunctional: boolean;

  @Column({ length: 150 })
  area: string;

  @Column({ length: 500 })
  location: string;

  @OneToMany(() => SupplyEntity, supply => supply.id)
  supplies: SupplyEntity[]
}