import { QuestionTags } from 'src/modules/question_tags/entities/question_tag.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('tags')
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  created_by: string;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  updated_by: string;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;

  @OneToMany(() => QuestionTags, (qt) => qt.tag)
  questionTags: QuestionTags[];
}
