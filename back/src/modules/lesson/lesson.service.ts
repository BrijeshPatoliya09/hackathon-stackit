import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Lesson } from './entity/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as uuidValidate } from 'uuid';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { FilterLessonInput } from './dto/filter-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    public readonly lessonRepository: Repository<Lesson>,
  ) {}

  findAll(filterLessonInput: FilterLessonInput): Promise<Lesson[]> {
    const { name, startDate, endDate } = filterLessonInput;

    const query = this.lessonRepository.createQueryBuilder('lesson');

    if (name) {
      query.andWhere('LOWER(lesson.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (startDate) {
      query.andWhere('LOWER(lesson.startDate) LIKE :startDate', {
        startDate: `%${startDate.toLowerCase()}%`,
      });
    }

    if (endDate) {
      query.andWhere('LOWER(lesson.endDate) LIKE :endDate', {
        endDate: `%${endDate.toLowerCase()}%`,
      });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Lesson> {
    if (!uuidValidate(id)) {
      throw new NotFoundException('Invalid ID');
    }

    const found = await this.lessonRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return found;
  }

  create(lesson: Lesson): Promise<Lesson> {
    const newLesson = this.lessonRepository.create(lesson);
    return this.lessonRepository.save(newLesson);
  }

  async update(lesson: UpdateLessonInput): Promise<Lesson> {
    const oldLesson = await this.findOne(lesson.id);
    const updatedLesson = { ...oldLesson, ...lesson };
    return this.lessonRepository.save(updatedLesson);
  }

  async delete(id: string): Promise<Lesson> {
    const lesson = await this.findOne(id);
    return this.lessonRepository.remove(lesson);
  }
}
