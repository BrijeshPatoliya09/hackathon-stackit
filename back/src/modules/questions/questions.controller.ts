import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Query,
  Put,
  ParseIntPipe,
  Req,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { baseController } from 'src/core/baseController';
import { GetQuestionsFilterDto } from './dto/get-questions.dto';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('create-questions')
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    if (req.headers.emailId) {
      createQuestionDto.created_by = req.headers.emailId as string;
    }
    const result =
      await this.questionsService.createQuestions(createQuestionDto);
    return baseController.getResult(
      res,
      200,
      result,
      'Question created successfully.',
    );
  }

  @Get()
  async findAll(
    @Query() filterDto: GetQuestionsFilterDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.questionsService.findAllQuestions(filterDto);
    return baseController.getResult(
      res,
      200,
      result,
      'Questions fetched successfully.',
    );
  }

  @Get(':id/get-question')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.questionsService.findOneQuestionById(id);
    return baseController.getResult(
      res,
      200,
      result,
      'Question fetched successfully.',
    );
  }

  @Patch(':id/update-question')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuestionDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.questionsService.updateQuestionById(id, dto);
    return baseController.getResult(
      res,
      200,
      result,
      'Question updated successfully.',
    );
  }
}
