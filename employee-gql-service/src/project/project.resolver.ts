import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectCreateDTO } from './entities/dto/create-project.input';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@Resolver()
export class ProjectResolver {

  constructor(private projectService: ProjectService) {}

  @Query(() => [Project], { name: 'getAllProjects' })
  findAll() {
    return this.projectService.findAll();
  }

  @Query(() => Project, { name: 'getProjectById' })
  findOne(@Args('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Mutation(() => Project, { name: 'createProject' })
  create(@Args('projectInput') employee: ProjectCreateDTO) {
    return this.projectService.create(employee);
  }
}

