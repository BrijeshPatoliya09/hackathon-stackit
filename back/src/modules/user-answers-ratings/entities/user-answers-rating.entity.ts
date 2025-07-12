import { Users } from 'src/modules/user/entity/users.entity';
import { UserAnswers } from 'src/modules/user_answers/entities/user_answer.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('user_answer_ratings')
export class UserAnswerRatings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_answers_id: number;

  @Column()
  user_id: number;

  @Column({ type: 'int', default: 0 })
  vote_count: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  created_by: string;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;

  @ManyToOne(() => UserAnswers, (ua) => ua.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_answers_id' })
  userAnswer: UserAnswers;

  @ManyToOne(() => Users, (u) => u.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
