import { Query } from '@nestjs/graphql';
import { Users } from './modules/user/entity/users.entity';
import { CurrentUser } from './commons/decorator/current-user.decorator';

export class AppResolver {
  @Query((returns) => String)
  async hello(
    @CurrentUser()
    user: Users,
  ) {
    return 'Hello World!';
  }
}
