import { Query } from '@nestjs/graphql';
import { User } from './modules/user/entity/users.entity';
import { CurrentUser } from './commons/decorator/current-user.decorator';

export class AppResolver {
  @Query((returns) => String)
  async hello(
    @CurrentUser()
    user: User,
  ) {
    return 'Hello World!';
  }
}
