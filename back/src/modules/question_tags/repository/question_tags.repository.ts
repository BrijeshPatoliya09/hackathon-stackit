import { dataSource } from 'src/core/data-source';
import { QuestionTags } from '../entities/question_tag.entity';

export const questionTagsRepository = dataSource.getRepository(QuestionTags);
