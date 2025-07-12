import { dataSource } from 'src/core/data-source';
import { Answer } from '../entities/answer.entity';

export const answerRepository = dataSource.getRepository(Answer);
