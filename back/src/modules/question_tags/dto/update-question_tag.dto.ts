import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionTagDto } from './create-question_tag.dto';

export class UpdateQuestionTagDto extends PartialType(CreateQuestionTagDto) {}
