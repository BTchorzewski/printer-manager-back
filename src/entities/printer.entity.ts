import { PrinterModel } from '../../types';
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoreEntity } from './store.entity';

//@todo specify enum in printer entitty
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

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  installedAt: Date;

  @Column({ length: 150 })
  area: string;

  @Column({ length: 500 })
  location: string;

  @OneToMany(() => StoreEntity, store => store.printer)
  @JoinColumn()
  supplies: StoreEntity[];
}