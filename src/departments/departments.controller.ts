import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { UpdateSalaryDto } from './dto/employee.dto';
import { WarterworksDto } from './dto/warterworks.dto';

@Controller()
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  // 특정 사원 정보
  @Get('department/employees/:id')
  async getEmployees(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.getEmployees(id);
  }

  // 특정 사원의 이력 정보
  @Get('department/employee/records/:id')
  async getEmployeesRecords(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.getEmployeesRecords(id);
  }

  // 부서 및 위치 정보 조회
  @Get('department/location/info')
  async getDepartmentAndLocationInfo() {
    return this.departmentsService.getDepartmentAndLocationInfo();
  }

  // 각부서의 employee 일정 rate로 급여 인상 업데이트
  @Post('department/salary/increase')
  async updateSalary(@Body() data: UpdateSalaryDto) {
    return this.departmentsService.updateSalary(data);
  }

  // RDBMS 스키마와 별개로 공공 데이터 포털( www.data.go.or ) 등에서 임의의 API 선택 후
  // numOfRows와 pageNo는 4를 초과하면 안된다. numOfRows는 페이지당 갯수불러오며, pageNo는 페이지 수 이다.
  @Get('busan/waterworks/situation')
  async waterworksSituation(@Body() data: WarterworksDto) {
    return this.departmentsService.waterworksSituation(
      data.numOfRows,
      data.pageNo,
    );
  }
}
