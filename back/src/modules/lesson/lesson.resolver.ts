import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Lesson } from './entity/lesson.entity';
import { LessonService } from './lesson.service';
import { Query } from '@nestjs/graphql';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { FilterLessonInput } from './dto/filter-lesson.input';

@Resolver((of) => Lesson)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  // get all
  @Query((returns) => [Lesson], { name: 'lessons' })
  async lessons(
    @Args('filterLessonInput') filterLessonInput: FilterLessonInput,
  ) {
    return this.lessonService.findAll(filterLessonInput);
  }

  // get by id
  @Query((returns) => Lesson, { name: 'getLessonById' })
  async lesson(@Args('id') id: string) {
    return this.lessonService.findOne(id);
  }

  // create
  @Mutation((returns) => Lesson, { name: 'createLesson' })
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.create(createLessonInput as unknown as Lesson);
  }

  // update
  @Mutation((returns) => Lesson, { name: 'updateLesson' })
  async updateLesson(
    @Args('updateLessonInput') updateLessonInput: UpdateLessonInput,
  ) {
    return this.lessonService.update(updateLessonInput);
  }

  // delete
  @Mutation((returns) => Lesson, { name: 'deleteLesson' })
  async deleteLesson(@Args('id') id: string) {
    return this.lessonService.delete(id);
  }
}
