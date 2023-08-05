import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Employee } from 'src/employee/entities/employee.entity'
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@ObjectType()
@Entity()
export class Project {
    @Field({ nullable: false })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field({ nullable: true })
    @Column()
    name: string

    @Field(() => Int, { nullable: true })
    @Column()
    code: number

    @OneToMany(() => Employee, employee => employee.project)
    @Field(() => [Employee], { nullable: true })
    employees: Employee[]
}