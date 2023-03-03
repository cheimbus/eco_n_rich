import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job_history } from './job.history.entity';

@Entity('jobs')
export class Jobs {
  @PrimaryGeneratedColumn({ type: 'int' })
  job_id: number;

  @Column({ type: 'varchar', nullable: false })
  job_title: string;

  @Column({ type: 'decimal' })
  min_salary: number;

  @Column({ type: 'decimal' })
  max_salary: number;

  @OneToMany(() => Job_history, (job_history) => job_history.job)
  job_history: Job_history[];
}
