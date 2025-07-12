import { Injectable } from '@nestjs/common';
import { UpdateUserAnswersRatingDto } from './dto/update-user-answers-rating.dto';
import { UserAnswerRatings } from './entities/user-answers-rating.entity';
import { userRatingRepository } from './repository/userAnswerRating.repository';

@Injectable()
export class UserAnswersRatingsService {
  async updateVote(
    dto: UpdateUserAnswersRatingDto,
  ): Promise<UserAnswerRatings> {
    const { user_answers_id, user_id, vote_count, updated_by } = dto;

    let rating = await userRatingRepository.findOne({
      where: { user_answers_id, user_id },
    });

    if (!rating) {
      rating = userRatingRepository.create({
        user_answers_id,
        user_id,
        vote_count,
        created_by: updated_by,
        created_date: new Date(),
        updated_date: new Date(),
      });
    } else {
      rating.vote_count = vote_count;
      rating.updated_date = new Date();
    }

    return await userRatingRepository.save(rating);
  }
}
