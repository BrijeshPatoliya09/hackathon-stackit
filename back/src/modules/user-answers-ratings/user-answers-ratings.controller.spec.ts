import { Test, TestingModule } from '@nestjs/testing';
import { UserAnswersRatingsController } from './user-answers-ratings.controller';
import { UserAnswersRatingsService } from './user-answers-ratings.service';

describe('UserAnswersRatingsController', () => {
  let controller: UserAnswersRatingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAnswersRatingsController],
      providers: [UserAnswersRatingsService],
    }).compile();

    controller = module.get<UserAnswersRatingsController>(UserAnswersRatingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
