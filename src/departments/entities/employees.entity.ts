import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Departments } from './departments.entity';

@Entity('employees')
export class Employees {
  @PrimaryGeneratedColumn({ type: 'int' })
  employee_id: number;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar', nullable: false })
  last_name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  phone_number: string;

  @Column({ type: 'date', nullable: false })
  hire_date: Date;

  @Column({ type: 'decimal', nullable: false })
  salary: number;

  @Column({ type: 'decimal', nullable: true })
  commission_pct: number;

  @Column({ name: 'department_id' })
  department_id: number;

  @ManyToOne(() => Departments, (department) => department.employees, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id', referencedColumnName: 'department_id' })
  department: Departments;
}
