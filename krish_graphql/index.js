const {ApolloServer,gql}= require('apollo-server')
const EmployeeService= require('./datasource/employeeService')
const ProjectService= require('./datasource/projectService')

const typeDefs = gql`
    type Query {
        helloWorld: String
        employees: [Employee]
        findEmployeeById(id: ID!): Employee
        employeesWithArgs(
            id: ID,
            firstName: String,
            lastName: String,
            designation: String,
            department: String,
            nearestCity: String
        ): [Employee]
        projects: [Project]
        projectFindById(id:ID): Project
    }

    type Employee {
        id: ID!,
        firstName: String,
        lastName: String,
        designation: String,
        department: String,
        nearestCity: String,
        fullName: String,
        projects: [Project]
    }

    type Project {
        id: ID!
        projectName: String
        startDate: String
        client: String
        employees: [Int]
        employeesFullDetails: [Employee]
    }
` 
const resolvers = {
    Query: {
        helloWorld: ()=> 'hellp world',
        employees: (root, args, {dataSources}, info) => dataSources.employeService.getEmployees(),
        findEmployeeById: (root, {id}, {dataSources}, info) => dataSources.employeService.getEmployeeById(id)[0],
        employeesWithArgs: (root, args, {dataSources}, info) => dataSources.employeService.getEmployeesWithArgs(args),
        projects: (root,args,{dataSources}, info) => dataSources.projectService.getProjects(),
        projectFindById: (root, {id}, {dataSources}, info) => dataSources.projectService.getProjectById(id),
    },

    Employee: {
        fullName: (root) => `${root.firstName} ${root.lastName}`,
        projects: async ({id},args,{dataSources}, info)=>{
            let projects = await dataSources.projectService.getProjects();
             return projects.filter((p) =>{
                return p.employees.includes(id)
            })
        }
    },

    Project: {
        employeesFullDetails: ({employees},args, {dataSources}, info)=>{
            let employees_ = []
            employees.forEach((id) => {
                console.log(id)
                let employeeById= dataSources.employeService.getEmployeeById(id)[0];
                employees_.push(employeeById);
            });
            return employees_;
        }
    }


}

const dataSources = ()=>({
    employeService: new EmployeeService(),
    projectService: new ProjectService()
})

const gqlServer = new ApolloServer({typeDefs, resolvers, dataSources});

gqlServer.listen({port: process.env.port || 4000})
.then(({url})=> console.log(`graphql server started on ${url}`)) 