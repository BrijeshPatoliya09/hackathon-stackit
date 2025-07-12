import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserAnswersRatingsService } from './user-answers-ratings.service';
import { CreateUserAnswersRatingDto } from './dto/create-user-answers-rating.dto';
import { UpdateUserAnswersRatingDto } from './dto/update-user-answers-rating.dto';

@Controller('user-answers-ratings')
export class UserAnswersRatingsController {
  constructor(
    private readonly userAnswersRatingsService: UserAnswersRatingsService,
  ) {}
}
