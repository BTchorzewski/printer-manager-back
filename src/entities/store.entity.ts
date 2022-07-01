import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrinterEntity } from './printer.entity';
import { SupplyEntity } from './supply.entity';

@Entity()
export class StoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ nullable: true })
  installedAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP'
  })
  storedAt: Date;

  @ManyToOne(() => PrinterEntity, printer => printer.supplies)
  @JoinColumn()
  printer: PrinterEntity;

  @ManyToOne(() => SupplyEntity, supply => supply.stores)
  @JoinColumn()
  supply: SupplyEntity;
}