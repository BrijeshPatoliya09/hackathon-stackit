import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { comparePassword } from 'src/utils/helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    const { email, password } = ctx.req.body.variables;
    const user = await this.userService.getUserByEmail(email);

    if (user && (await comparePassword(password, user.password))) {
      const {password, ...res} = user;
      ctx.user = res;
      return true;
    } else {
      throw new HttpException('UnAuthenticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
