import { Injectable } from '@nestjs/common';
import { CreateUserAnswersRatingDto } from './dto/create-user-answers-rating.dto';
import { UpdateUserAnswersRatingDto } from './dto/update-user-answers-rating.dto';

@Injectable()
export class UserAnswersRatingsService {
  create(createUserAnswersRatingDto: CreateUserAnswersRatingDto) {
    return 'This action adds a new userAnswersRating';
  }

  findAll() {
    return `This action returns all userAnswersRatings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAnswersRating`;
  }

  update(id: number, updateUserAnswersRatingDto: UpdateUserAnswersRatingDto) {
    return `This action updates a #${id} userAnswersRating`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAnswersRating`;
  }
}
