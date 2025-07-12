import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterLessonInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  startDate: string;

  @Field({ nullable: true })
  endDate: string;
}
