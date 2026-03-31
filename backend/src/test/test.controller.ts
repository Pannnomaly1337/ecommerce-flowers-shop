import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @Get('create')
  create() {
    return this.testService.createUser();
  }

  @Get()
  findAll() {
    return this.testService.getUsers();
  }
}
