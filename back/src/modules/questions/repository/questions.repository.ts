import { dataSource } from 'src/core/data-source';
import { Questions } from '../entities/question.entity';

export const questionRepository = dataSource.getRepository(Questions);
