import { Module } from '@nestjs/common';
import { UserAnswersRatingsService } from './user-answers-ratings.service';
import { UserAnswersRatingsController } from './user-answers-ratings.controller';

@Module({
  controllers: [UserAnswersRatingsController],
  providers: [UserAnswersRatingsService],
})
export class UserAnswersRatingsModule {}
