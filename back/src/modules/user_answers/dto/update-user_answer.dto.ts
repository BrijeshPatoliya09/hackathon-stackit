import { IsOptional, IsString } from 'class-validator';

export class UpdateAnswerDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  updated_by?: string;
}
