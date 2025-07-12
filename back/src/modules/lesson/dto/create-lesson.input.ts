import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLessonInput {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  startDate: string;

  @Field((type) => String)
  endDate: string;
}
