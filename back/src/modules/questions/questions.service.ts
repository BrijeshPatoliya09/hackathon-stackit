import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Questions } from './entities/question.entity';
import { questionRepository } from './repository/questions.repository';

@Injectable()
export class QuestionsService {
  async createQuestions(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Questions> {
    const result = await questionRepository.save(createQuestionDto);
    return result;
  }

  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
