import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionTagsService } from './question_tags.service';
import { CreateQuestionTagDto } from './dto/create-question_tag.dto';
import { UpdateQuestionTagDto } from './dto/update-question_tag.dto';

@Controller('question-tags')
export class QuestionTagsController {
  constructor(private readonly questionTagsService: QuestionTagsService) {}
}
