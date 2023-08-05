import { Injectable } from '@nestjs/common';
import {Query} from '@nestjs/graphql'
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeCreateDTO } from './entities/dto/create-employee.input';

@Injectable()
export class EmployeeService {
   constructor(@InjectRepository(Employee) private employeeRepository:Repository<Employee>){}

   async findAll():Promise<Employee[]>{
    return this.employeeRepository.find({
      relations:["project"]
    });
   }

   async findOne(id:string){
      return this.employeeRepository.findOne({where: {id: id}});
   }

   async create(employee: EmployeeCreateDTO): Promise<Employee> {
      let emp = this.employeeRepository.create(employee);
      return this.employeeRepository.save(emp)
  }
}
