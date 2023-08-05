import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectCreateDTO } from './entities/dto/create-project.input';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(Project) private projectRepository:Repository<Project>){}

    async findAll():Promise<Project[]>{
     return this.projectRepository.find({
        relations: ["employees"]
     });
    }
 
    async findOne(id:string){
       return this.projectRepository.findOne({where: {id: id}});
    }
 
    async create(project: ProjectCreateDTO): Promise<Project> {
       let proj = this.projectRepository.create(project);
       return this.projectRepository.save(proj)
   }
}
