import { Field, ObjectType } from '@nestjs/graphql'
import { Project } from 'src/project/entities/project.entity'
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

@ObjectType()
@Entity()
export class Employee {
    @Field({ nullable: false })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field({ nullable: true })
    @Column()
    firstName: string

    @Field({ nullable: true })
    @Column()
    lastName: string

    @Field({ nullable: true })
    @Column()
    designation: string

    @Field({ nullable: true })
    @Column({nullable: true})
    city: string

    @ManyToOne(()=> Project, project=> project.employees)
    @Field(() => Project)
    project: Project

    @Column()
    @Field()
    projectId: string


}