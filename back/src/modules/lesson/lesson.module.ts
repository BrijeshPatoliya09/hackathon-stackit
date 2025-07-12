import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entity/lesson.entity';
import { LessonService } from './lesson.service';
import { LessonResolver } from './lesson.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  providers: [LessonService, LessonResolver],
})
export class LessonModule {}
