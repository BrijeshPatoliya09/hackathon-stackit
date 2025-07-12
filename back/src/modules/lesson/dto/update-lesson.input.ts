import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateLessonInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  startDate: string;

  @Field({ nullable: true })
  endDate: string;
}
