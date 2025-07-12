import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAnswersRatingDto } from './create-user-answers-rating.dto';

export class UpdateUserAnswersRatingDto extends PartialType(CreateUserAnswersRatingDto) {}
