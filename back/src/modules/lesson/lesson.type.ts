import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Lesson')
export class LessonType {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  startDate: string;

  @Field((type) => String)
  endDate: string;
}
