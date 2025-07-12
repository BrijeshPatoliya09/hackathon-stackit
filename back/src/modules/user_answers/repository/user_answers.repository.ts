import { dataSource } from 'src/core/data-source';
import { UserAnswers } from '../entities/user_answer.entity';

export const userAnswersRepository = dataSource.getRepository(UserAnswers);
