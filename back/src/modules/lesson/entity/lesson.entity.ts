import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lesson' })
@ObjectType()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => String)
  id: string;

  @Column()
  @Field((type) => String)
  name: string;

  @Column()
  @Field((type) => String)
  startDate: string;

  @Column()
  @Field((type) => String)
  endDate: string;
}
