import { Questions } from 'src/modules/questions/entities/question.entity';
import { Tags } from 'src/modules/tags/entities/tag.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('question_tags')
export class QuestionTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question_id: number;

  @Column()
  tag_id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  created_by: string;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  updated_by: string;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;

  @ManyToOne(() => Questions, (q) => q.questionTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: Questions;

  @ManyToOne(() => Tags, (t) => t.questionTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  tag: Tags;
}
