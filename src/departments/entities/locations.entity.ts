import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Countries } from './countries.entity';
import { Departments } from './departments.entity';

@Entity('locations')
export class Locations {
  @PrimaryGeneratedColumn({ type: 'int' })
  location_id: number;

  @Column({ type: 'varchar' })
  street_address: string;

  @Column({ type: 'varchar' })
  postal_code: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  state_province: string;

  @Column({ name: 'country_id' })
  country_id: number;

  @OneToMany(() => Departments, (department) => department.location)
  department: Departments[];

  @ManyToOne(() => Countries, (country) => country.location, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id', referencedColumnName: 'country_id' })
  country: Countries;
}
