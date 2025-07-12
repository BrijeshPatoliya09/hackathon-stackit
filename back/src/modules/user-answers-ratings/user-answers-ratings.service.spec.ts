import { Test, TestingModule } from '@nestjs/testing';
import { UserAnswersRatingsService } from './user-answers-ratings.service';

describe('UserAnswersRatingsService', () => {
  let service: UserAnswersRatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAnswersRatingsService],
    }).compile();

    service = module.get<UserAnswersRatingsService>(UserAnswersRatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
