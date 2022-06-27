import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrinterEntity } from './printer.entity';
import { SupplyEntity } from './supply.entity';

@Entity()
export class StoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column()
  installedAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP'
  })
  storedAt: Date;

  @ManyToOne(() => PrinterEntity, printer => printer.id)
  printer: PrinterEntity;

  @ManyToOne(() => SupplyEntity, supply => supply.id)
  supply: SupplyEntity;
}