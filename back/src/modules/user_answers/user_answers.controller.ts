import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateAnswerDto } from './dto/create-user_answer.dto';
import { UpdateAnswerDto } from './dto/update-user_answer.dto';
import { UserAnswersService } from './user_answers.service';
import { baseController } from '../../core/baseController';

@Controller('answers')
export class UserAnswersController {
  constructor(private readonly userAnswersService: UserAnswersService) {}

  @Post()
  async create(
    @Body() createAnswerDto: CreateAnswerDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.userAnswersService.create(createAnswerDto);
    return baseController.getResult(
      res,
      201,
      result,
      'Answer created successfully.',
    );
  }

  @Get('by_id/:answer_id')
  async findOne(
    @Param('answer_id', ParseIntPipe) answer_id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.userAnswersService.findOne(answer_id);
    return baseController.getResult(
      res,
      200,
      result,
      `Answer #${answer_id} fetched.`,
    );
  }

  @Get('by_question/:question_id')
  async findByQuestionId(
    @Param('question_id', ParseIntPipe) question_id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.userAnswersService.findByQuestionId(question_id);
    return baseController.getResult(
      res,
      200,
      result,
      `Answers for question #${question_id} fetched.`,
    );
  }

  @Patch('update/:answer_id')
  async update(
    @Param('answer_id', ParseIntPipe) answer_id: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.userAnswersService.update(
      answer_id,
      updateAnswerDto,
    );
    return baseController.getResult(
      res,
      200,
      result,
      `Answer #${answer_id} updated successfully.`,
    );
  }

  @Delete('delete/:answer_id')
  async remove(
    @Param('answer_id', ParseIntPipe) answer_id: number,
    @Res() res: Response,
  ): Promise<Response> {
    await this.userAnswersService.remove(answer_id);
    return baseController.getResult(
      res,
      200,
      null,
      `Answer #${answer_id} deleted successfully.`,
    );
  }
}
