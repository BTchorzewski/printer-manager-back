import { PrinterModel } from '../../types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrinterEntity } from './printer.entity';

@Entity()
export class SupplyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  model: PrinterModel;

  @Column()
  code: string;

  @Column()
  isAvailable: boolean;

  @Column()
  installedAt: Date;

  @Column()
  storedAt: Date;

  @ManyToOne(() => PrinterEntity, printer => printer.id)
  printerId: PrinterEntity;
}