import { QuestionTags } from 'src/modules/question_tags/entities/question_tag.entity';
import { UserAnswers } from 'src/modules/user_answers/entities/user_answer.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('questions')
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  created_by: string;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  updated_by: string;

  @OneToMany(() => QuestionTags, (qt) => qt.question)
  questionTags: QuestionTags[];

  @OneToMany(() => UserAnswers, (ua) => ua.question)
  userAnswers: UserAnswers[];
}
