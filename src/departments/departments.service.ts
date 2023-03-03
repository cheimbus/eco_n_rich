import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import dataSource from 'ormconfig';
import { catchError, firstValueFrom } from 'rxjs';
import { UpdateSalaryDto } from './dto/employee.dto';
import { Departments } from './entities/departments.entity';
import { Employees } from './entities/employees.entity';
import { Job_history } from './entities/job.history.entity';

@Injectable()
export class DepartmentsService {
  constructor(private readonly httpService: HttpService) {}
  async getEmployees(id: number): Promise<object> {
    const employeeInfo = await dataSource
      .getRepository(Employees)
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.department', 'd')
      .where('e.employee_id=:employee_id', { employee_id: id })
      .getOne();
    return {
      employee_id: employeeInfo.employee_id,
      first_name: employeeInfo.first_name,
      last_name: employeeInfo.last_name,
      email: employeeInfo.email,
      phone_number: employeeInfo.phone_number,
      hire_date: employeeInfo.hire_date,
      salary: employeeInfo.salary,
      department_name: employeeInfo.department.department_name,
    };
  }

  async getEmployeesRecords(id: number): Promise<object> {
    const employeeInfo = await dataSource
      .getRepository(Job_history)
      .createQueryBuilder('j')
      .leftJoinAndSelect('j.department', 'd')
      .leftJoinAndSelect('j.job', 'jh')
      .where('j.employee_id=:employee_id', { employee_id: id })
      .select([
        'j.employee_id',
        'j.department_id',
        'j.start_date',
        'j.end_date',
        'j.job_id',
        'd.department_name',
        'jh.job_id',
        'jh.job_title',
      ])
      .getMany();
    return employeeInfo;
  }

  async getDepartmentAndLocationInfo(): Promise<object> {
    const departmentLocationInfo = await dataSource
      .getRepository(Departments)
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.location', 'l')
      .leftJoinAndSelect('l.country', 'c')
      .leftJoinAndSelect('c.region', 'r')
      .select([
        'd.department_id',
        'd.department_name',
        'l.city',
        'l.street_address',
        'l.state_province',
        'c.country_name',
        'r.region_name',
      ])
      .getMany();
    return departmentLocationInfo;
  }

  async updateSalary(data: UpdateSalaryDto) {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const employeeInfo = await dataSource
        .getRepository(Employees)
        .createQueryBuilder('e')
        .leftJoinAndSelect('e.department', 'd')
        .where('e.department_id=:department_id', {
          department_id: data.department_id,
        })
        .getManyAndCount();
      for (let i = 0; i < employeeInfo[1]; i++) {
        const rate =
          Number(employeeInfo[0][i].salary) * (data.increase_rate / 100);
        const salary = Number(employeeInfo[0][i].salary) + rate;
        await dataSource
          .createQueryBuilder()
          .update(Employees)
          .set({ salary })
          .where('employee_id = :employee_id', {
            employee_id: employeeInfo[0][i].employee_id,
          })
          .execute();
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async waterworksSituation(numOfRows: number, pageNo: number) {
    if (numOfRows > 4 || pageNo > 4) {
      throw new BadRequestException('잘못된 요청입니다.');
    }
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `http://apis.data.go.kr/6260000/WaterSuspensionService/getWaterSuspensionInfo?serviceKey=KNnLklsFlLvcSQ5a%2BVouOhV6Hemorisn2F6cnQhcHKZvzN5aNnizsXDLj5pu3m6O1Zv3689RLUSvKThaFXgUvA%3D%3D&numOfRows=${numOfRows}&pageNo=${pageNo}&resultType=json`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw 'An error happened!';
          }),
        ),
    );
    return data.getWaterSuspensionInfo.body.items.item;
  }
}
