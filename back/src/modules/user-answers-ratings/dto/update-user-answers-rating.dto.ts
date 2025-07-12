import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateUserAnswersRatingDto {
  @IsNumber()
  user_answers_id: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  vote_count: number;

  @IsNotEmpty()
  updated_by: string;
}
