import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Countries } from './countries.entity';

@Entity('regions')
export class Regions {
  @PrimaryGeneratedColumn({ type: 'int' })
  region_id: number;

  @Column({ type: 'varchar' })
  region_name: string;

  @OneToMany(() => Countries, (country) => country.region)
  country: Countries[];
}
