const employees= require('../data/employees.json')
const {DataSource} =require('apollo-datasource')
const {filter} =require('lodash')

class EmployeeService extends DataSource {

constructor(){
    super();
}

initialize(confi){

}

getEmployees(){
    return employees;
}

getEmployeeById(id){
    return employees.filter(function(employee){
        return employee.id==id;
    });
}
getEmployeesWithArgs(args){
    return filter(employees, args)
}
}
module.exports=EmployeeService