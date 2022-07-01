import { PrinterModel } from '../../types';
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(() => StoreEntity, store => store.supply)
  @JoinColumn()
  stores: StoreEntity[];

  // addStoreItem(storeItem: StoreEntity){
  //   if(this.stores === undefined) {
  //
  //     // @ts-ignore
  //     this.stores = new Array<StoreEntity>();
  //   }
  //   // @ts-ignore
  //   this.stores.push(storeItem)
  // }
}