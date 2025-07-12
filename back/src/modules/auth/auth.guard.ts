import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { comparePassword } from 'src/utils/helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.body;

    const { email, hash } = authHeader;
    const user = await this.userService.getUserByEmail(email);

    if (user && (await comparePassword(hash, user.hash))) {
      const { hash, ...res } = user;
      req.user = res;
      return true;
    } else {
      throw new HttpException('UnAuthenticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
