import { dataSource } from 'src/core/data-source';
import { UserAnswers } from '../entities/user_answer.entity';

export const userAnswerRepository = dataSource.getRepository(UserAnswers);
