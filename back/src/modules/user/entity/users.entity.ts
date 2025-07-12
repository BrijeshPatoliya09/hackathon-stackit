import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { UserAnswers } from 'src/modules/user_answers/entities/user_answer.entity';
import { UserAnswerRatings } from 'src/modules/user-answers-ratings/entities/user-answers-rating.entity';

@Entity({ name: 'users' })
@ObjectType()
export class Users {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column('character varying', {
    length: 100,
    name: 'first_name',
    nullable: true,
  })
  @Field({ nullable: true })
  first_name?: string;

  @Column('character varying', {
    length: 100,
    name: 'last_name',
    nullable: true,
  })
  @Field({ nullable: true })
  last_name?: string;

  @Column('character varying', { length: 100, unique: true })
  @Field()
  @IsEmail()
  email: string;

  @Column('character varying', { length: 255, name: 'hash' })
  @Field()
  hash: string;

  @Column({ name: 'role_id', nullable: true })
  @Field(() => Number, { nullable: true })
  role_id?: number;

  @Column({ name: 'is_banned', type: 'boolean', default: false })
  @Field()
  is_banned: boolean;

  @Column({
    name: 'created_by',
    type: 'character varying',
    length: 100,
    nullable: true,
  })
  @Field({ nullable: true })
  created_by?: string;

  @Column({
    name: 'created_date',
    type: 'timestamp without time zone',
    nullable: true,
  })
  @Field({ nullable: true })
  created_date?: Date;

  @Column({
    name: 'updated_by',
    type: 'character varying',
    length: 100,
    nullable: true,
  })
  @Field({ nullable: true })
  updated_by?: string;

  @Column({
    name: 'updated_date',
    type: 'timestamp without time zone',
    nullable: true,
  })
  @Field({ nullable: true })
  updated_date?: Date;

  @OneToMany(() => UserAnswers, (ua) => ua.user)
  userAnswers: UserAnswers[];

  @OneToMany(() => UserAnswerRatings, (rating) => rating.user)
  ratings: UserAnswerRatings[];
}
