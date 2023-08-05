const {RESTDataSource}= require('apollo-datasource-rest')

class ProjectService extends RESTDataSource {
    constructor(){
        super();
        this.baseURL= 'http://localhost:3000'
    }

    async getProjects(){
        try {
            const projects = await this.get('/projects');
            return projects;
        } catch (error) {
            return console.log(error.message);
        }
    }
    async getProjectById(id){
        try{
            const project = await this.get(`/projects/${id}`);
            return project;
        }
        catch(error){
            return console.log(error.message); 
        }
    }
}

module.exports= ProjectService;