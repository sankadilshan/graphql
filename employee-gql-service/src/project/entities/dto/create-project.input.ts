import { Field, InputType, Int } from "@nestjs/graphql"

@InputType()
export class ProjectCreateDTO {
    @Field({ nullable: true })
    name: string

    @Field(() => Int, { nullable: true })
    code: number
}