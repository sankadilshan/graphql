# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type Project {
  id: String!
  name: String
  code: Int
  employees: [Employee!]
}

type Employee {
  id: String!
  firstName: String
  lastName: String
  designation: String
  city: String
  project: Project!
  projectId: String!
}

type Query {
  getAllEmployees: [Employee!]!
  getEmployeeById(id: String!): Employee
  getAllProjects: [Project!]!
  getProjectById(id: String!): Project!
}

type Mutation {
  createEmployee(employeeInput: EmployeeCreateDTO!): Employee!
  createProject(projectInput: ProjectCreateDTO!): Project!
}

input EmployeeCreateDTO {
  firstName: String!
  lastName: String!
  designation: String!
  city: String!
  projectId: String!
}

input ProjectCreateDTO {
  name: String
  code: Int
}