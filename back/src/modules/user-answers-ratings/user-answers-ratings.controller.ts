import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAnswersRatingsService } from './user-answers-ratings.service';
import { CreateUserAnswersRatingDto } from './dto/create-user-answers-rating.dto';
import { UpdateUserAnswersRatingDto } from './dto/update-user-answers-rating.dto';

@Controller('user-answers-ratings')
export class UserAnswersRatingsController {
  constructor(private readonly userAnswersRatingsService: UserAnswersRatingsService) {}

  @Post()
  create(@Body() createUserAnswersRatingDto: CreateUserAnswersRatingDto) {
    return this.userAnswersRatingsService.create(createUserAnswersRatingDto);
  }

  @Get()
  findAll() {
    return this.userAnswersRatingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAnswersRatingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAnswersRatingDto: UpdateUserAnswersRatingDto) {
    return this.userAnswersRatingsService.update(+id, updateUserAnswersRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAnswersRatingsService.remove(+id);
  }
}
