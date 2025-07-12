import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Questions } from './entities/question.entity';
import { questionRepository } from './repository/questions.repository';
import { questionTagsRepository } from '../question_tags/repository/question_tags.repository';
import { PageOptionsDto } from 'src/general-dto/page-option.dto';
import { PageMetaDto } from 'src/general-dto/pagemeta.dto';
import { PageDto } from 'src/general-dto/page.dto';
import { GetQuestionsFilterDto } from './dto/get-questions.dto';
import { tagRepository } from '../tags/repository/tags.repository';
import { In } from 'typeorm';

@Injectable()
export class QuestionsService {
  async createQuestions(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Questions> {
    const { tags, ...questionData } = createQuestionDto;

    const savedQuestion = await questionRepository.save({
      ...questionData,
      created_date: new Date(),
    });

    const tagLinks = tags.map((tagId) => ({
      question_id: savedQuestion.id,
      tag_id: Number(tagId),
      created_by: createQuestionDto.created_by,
      created_date: new Date(),
    }));

    await questionTagsRepository.save(tagLinks);

    return savedQuestion;
  }

  async findAllQuestions(
    filterDto: GetQuestionsFilterDto,
  ): Promise<PageDto<Questions>> {
    const { title, tags, created_by } = filterDto;

    const query = await questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.tags', 'tag');

    if (title) {
      query.andWhere(`LOWER(question.title) LIKE LOWER(:title)`, {
        title: `%${title.trim().toLowerCase()}%`,
      });
    }

    if (created_by) {
      query.andWhere(`question.created_by = :created_by`, { created_by });
    }

    if (tags && tags.length > 0) {
      query.andWhere(`tag.name IN (:...tags)`, { tags });
    }

    if (filterDto.orderBy) {
      query.orderBy(`question.${filterDto.orderBy}`, filterDto.order);
    } else {
      query.orderBy(`question.created_date`, filterDto.order);
    }

    if (String(filterDto.noLimit) === 'true') {
      const rows = await query.getMany();
      const pageOptionsDto: PageOptionsDto = {
        take: rows.length,
        createdDate: new Date(),
        order: filterDto.order,
        skip: 0,
      } as PageOptionsDto;
      const pageMetaDto = new PageMetaDto({
        itemCount: rows.length,
        pageOptionsDto,
      });
      return new PageDto(rows, pageMetaDto);
    } else {
      query.skip(filterDto.skip).take(filterDto.take);
      const itemCount = await query.getCount();
      const { entities } = await query.getRawAndEntities();
      const pageOptionsDto: PageOptionsDto = {
        take: filterDto.take,
        createdDate: new Date(),
        order: filterDto.order,
        skip: filterDto.skip,
      } as PageOptionsDto;
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      return new PageDto(entities, pageMetaDto);
    }
  }

  async findOneQuestionById(id: number): Promise<Questions> {
    const question = await questionRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  async updateQuestionById(
    id: number,
    dto: UpdateQuestionDto,
  ): Promise<Questions> {
    const question = await questionRepository.findOne({ where: { id } });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    Object.assign(question, {
      ...dto,
      updated_date: new Date(),
    });

    const updatedQuestion = await questionRepository.save(question);

    if (dto.tags && dto.tags.length > 0) {
      await questionTagsRepository.delete({ question_id: id });

      const tagLinks = dto.tags.map((tagId) => ({
        question_id: id,
        tag_id: Number(tagId),
        created_by: dto.updated_by,
        created_date: new Date(),
        updated_by: dto.updated_by,
        updated_date: new Date(),
      }));

      await questionTagsRepository.save(tagLinks);
    }

    return updatedQuestion;
  }
}
