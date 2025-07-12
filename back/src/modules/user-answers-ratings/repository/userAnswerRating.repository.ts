import { dataSource } from 'src/core/data-source';
import { UserAnswerRatings } from '../entities/user-answers-rating.entity';

export const userRatingRepository = dataSource.getRepository(UserAnswerRatings);
