import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { UserAnswersModule } from './user_answers/user_answers.module';
import { QuestionTagsModule } from './question_tags/question_tags.module';
import { TagsModule } from './tags/tags.module';
import { UserAnswersRatingsModule } from './user-answers-ratings/user-answers-ratings.module';

export const ApplicationModules = [
    UserModule,
    AuthModule,
];
