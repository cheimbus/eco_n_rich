# 에코앤리치

## 구현목록

- 특정 사원의 현재 정보 조회 가능한 API 구현
- 특정 사원의 이력 정보 조회 가능한 API 구현
- 부서 및 위치 정보 조회 가능한 API 구현
- 특정 부서의 급여를 특정 비율로 인상 및 사원 정보 업데이트 할 수 있는 API 구현
- RDBMS 스키마와 별개로 공공 데이터 포털( www.data.go.or ) 등에서 임의의 API 선택 후 조회 가능하도록 커스터마이징된 API 구현

## API
- 특정 사원의 현재 정보 조회 가능한 API 구현
  - 요청할 때 파라미터는 employee_id인 100 ~ 206을 입력하면 된다.   
ex) GET / http://ec2-3-38-168-229.ap-northeast-2.compute.amazonaws.com:3000/department/employees/101

- 특정 사원의 이력 정보 조회 가능한 API 구현
  - job_history에 있는 employee_id를 사용하였다. 따라서 파라미터는 101, 102, 114, 112, 176, 200, 201을 입력하면 된다.   
ex) GET / http://ec2-3-38-168-229.ap-northeast-2.compute.amazonaws.com:3000/department/employee/records/101

- 부서 및 위치 정보 조회 가능한 API 구현
  - 부서의 위치와 정보를 조회할 수 있다.   
ex) GET / http://ec2-3-38-168-229.ap-northeast-2.compute.amazonaws.com:3000/department/location/info

- 특정 부서의 급여를 특정 비율로 인상 및 사원 정보 업데이트 할 수 있는 API 구현
  - 특정 부서와 비율을 바디로 요청하면 된다. 예를들어 body에 특정 부서의 id "department_id": 10, 특정 비율 "increase_rate": 10 을 입력하면 된다.
  - 응답으로는 "업데이트 되었습니다!" 가 응답으로 온다.   
ex) POST / http://ec2-3-38-168-229.ap-northeast-2.compute.amazonaws.com:3000/department/salary/increase

- RDBMS 스키마와 별개로 공공 데이터 포털( www.data.go.or ) 등에서 임의의 API 선택 후 조회 가능하도록 커스터마이징된 API 구현
  - 공공API인 부산광역시 상수도 단수현황을 가져와 각 페이지별로 몇 개씩 가져오는 API를 구현하였다.
  - 파라미터는 2개를 요구하는데, 각각 페이지 결과 수, 페이지 번호를 의미한다.
  - 요구사항이 있는데, 각 페이지는 4페이지를 넘길 수 없으며 페이지 결과 또한 4개를 넘길 수 없다.   
ex) GET / http://ec2-3-38-168-229.ap-northeast-2.compute.amazonaws.com:3000/busan/waterworks/situation/4/3

  
