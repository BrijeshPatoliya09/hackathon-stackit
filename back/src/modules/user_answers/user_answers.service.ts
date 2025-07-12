import { Injectable, NotFoundException } from '@nestjs/common';
import { userAnswersRepository } from './repository/user_answers.repository';
import { CreateAnswerDto } from './dto/create-user_answer.dto';
import { UserAnswers } from './entities/user_answer.entity';
import { UpdateAnswerDto } from './dto/update-user_answer.dto';

@Injectable()
export class UserAnswersService {
  async create(createAnswerDto: CreateAnswerDto): Promise<UserAnswers> {
    const answer = userAnswersRepository.create({
      ...createAnswerDto,
      created_date: new Date(),
    });

    return await userAnswersRepository.save(answer);
  }

  async findOne(id: number): Promise<UserAnswers> {
    const answer = await userAnswersRepository.findOne({ where: { id } });
    if (!answer) throw new NotFoundException(`Answer ID ${id} not found`);
    return answer;
  }

  async update(id: number, dto: UpdateAnswerDto): Promise<UserAnswers> {
    const answer = await this.findOne(id);
    Object.assign(answer, {
      ...dto,
      updated_date: new Date(),
    });
    return await userAnswersRepository.save(answer);
  }

  async remove(id: number): Promise<void> {
    const result = await userAnswersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Answer ID ${id} not found`);
    }
  }

  async findByQuestionId(question_id: number): Promise<UserAnswers[]> {
    return await userAnswersRepository.find({
      where: { question_id },
      order: { created_date: 'DESC' },
    });
  }
}
