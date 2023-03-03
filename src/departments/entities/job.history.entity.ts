import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Departments } from './departments.entity';
import { Jobs } from './jobs.entity';

@Entity('job_history')
export class Job_history {
  @PrimaryGeneratedColumn({ type: 'int' })
  department_id: number;

  @Column({ type: 'date', nullable: false })
  start_date: Date;

  @Column({ type: 'date', nullable: false })
  end_date: Date;

  @Column({ name: 'job_id' })
  job_id: number;

  @ManyToOne(() => Departments, (department) => department.employees, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id', referencedColumnName: 'department_id' })
  department: Departments;

  @ManyToOne(() => Jobs, (job) => job.job_history, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'job_id', referencedColumnName: 'job_id' })
  job: Jobs;
}
