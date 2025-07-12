import { Field, InputType } from '@nestjs/graphql';
import { UserRoles } from './user.role.enum';
import { IsEmail, IsEnum, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field((type) => String)
  @IsString()
  username: string;

  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  @IsString()
  password: string;

  @Field((type) => String)
  @IsEnum(UserRoles)
  role: UserRoles;
}
