import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '../dto/user.role.enum';
import { IsEmail, IsEnum } from 'class-validator';
import { ResponseObject } from 'src/utils/response.object';

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => String)
  id: string;

  @Column('character varying', { length: 100, name: 'username' })
  @Field((type) => String)
  username: string;

  @Column('character varying', { unique: true, name: 'email' })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column('character varying', { name: 'password' })
  @Field((type) => String)
  password: string;

  @Column('enum', { enum: UserRoles, name: 'role' })
  @Field((type) => String)
  @IsEnum(UserRoles)
  role: UserRoles;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field((type) => String)
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field((type) => String)
  updatedAt: Date;
}
