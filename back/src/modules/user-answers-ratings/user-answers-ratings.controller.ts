import { Controller, Patch, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserAnswersRatingsService } from './user-answers-ratings.service';
import { UpdateUserAnswersRatingDto } from './dto/update-user-answers-rating.dto';
import { baseController } from 'src/core/baseController';

@Controller('user-answers-ratings')
export class UserAnswersRatingsController {
  constructor(
    private readonly userAnswersRatingsService: UserAnswersRatingsService,
  ) {}

  @Patch('vote')
  async updateVote(
    @Body() dto: UpdateUserAnswersRatingDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.userAnswersRatingsService.updateVote(dto);
    return baseController.getResult(
      res,
      200,
      result,
      'Vote count updated successfully.',
    );
  }
}
