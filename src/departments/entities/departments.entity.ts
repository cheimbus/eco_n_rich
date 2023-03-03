import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employees } from './employees.entity';
import { Job_history } from './job.history.entity';
import { Locations } from './locations.entity';

@Entity('departments')
export class Departments {
  @PrimaryGeneratedColumn({ type: 'int' })
  department_id: number;

  @Column({ type: 'varchar', nullable: false })
  department_name: string;

  @Column({ name: 'location_id' })
  location_id: number;

  @OneToMany(() => Employees, (employee) => employee.department)
  employees: Employees[];

  @OneToMany(() => Job_history, (job_history) => job_history.department)
  job_history: Job_history[];

  @ManyToOne(() => Locations, (location) => location.department, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'location_id', referencedColumnName: 'location_id' })
  location: Departments;
  country: any;
  employee: any;
}
