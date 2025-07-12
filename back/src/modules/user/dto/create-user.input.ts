import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

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
  hash: string;
}
