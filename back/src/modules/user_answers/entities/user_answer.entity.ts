import { Questions } from 'src/modules/questions/entities/question.entity';
import { UserAnswerRatings } from 'src/modules/user-answers-ratings/entities/user-answers-rating.entity';
import { Users } from 'src/modules/user/entity/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('user_answers')
export class UserAnswers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question_id: number;

  @Column()
  user_id: number;

  @Column('text')
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  created_by: string;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  updated_by: string;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;

  @ManyToOne(() => Questions, (q) => q.userAnswers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: Questions;

  @ManyToOne(() => Users, (u) => u.userAnswers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => UserAnswerRatings, (r) => r.userAnswer)
  ratings: UserAnswerRatings[];
}
