import { DataSource } from 'typeorm';
import { Countries } from 'src/departments/entities/countries.entity';
import { Departments } from 'src/departments/entities/departments.entity';
import { Employees } from 'src/departments/entities/employees.entity';
import { Job_history } from 'src/departments/entities/job.history.entity';
import { Jobs } from 'src/departments/entities/jobs.entity';
import { Locations } from 'src/departments/entities/locations.entity';
import { Regions } from 'src/departments/entities/regions.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'a!950403',
  database: 'econrich',
  entities: [
    Countries,
    Departments,
    Employees,
    Job_history,
    Jobs,
    Locations,
    Regions,
  ],
  // synchronize: true,
});

export default dataSource;
dataSource
  .initialize()
  .then(() => console.log('Data Source has been initialized'))
  .catch((error) => console.error('Error initializing Data Source', error));
