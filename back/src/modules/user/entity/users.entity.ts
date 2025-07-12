import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
// import { Role } from './role.entity'; // assuming you have a Role entity defined

@Entity({ name: 'users' }) // Table name as in your SQL
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

  // @ManyToOne(() => Role)
  // @JoinColumn({ name: 'role_id' })
  // role?: Role;

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
}
