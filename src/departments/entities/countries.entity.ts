import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Locations } from './locations.entity';
import { Regions } from './regions.entity';

@Entity('countries')
export class Countries {
  @PrimaryGeneratedColumn({ type: 'int' })
  country_id: number;

  @Column({ type: 'varchar', nullable: false })
  country_name: string;

  @Column({ name: 'region_id' })
  region_id: number;

  @OneToMany(() => Locations, (location) => location.country)
  location: Locations[];

  @ManyToOne(() => Regions, (region) => region.country, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'region_id', referencedColumnName: 'region_id' })
  region: Regions;
}
