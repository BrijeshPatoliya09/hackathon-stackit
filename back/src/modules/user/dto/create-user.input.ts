import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field((type) => String)
  @IsString()
  username: string;

  @Field((type) => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field((type) => String)
  @IsString()
  @IsNotEmpty()
  hash: string;
}
