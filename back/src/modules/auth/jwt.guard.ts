import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { userRepository } from '../user/repository/user-session.repository';

const BYPASS_OPERATIONS = ['login', 'createUser'];

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const ctx = GqlExecutionContext.create(context).getContext();
    // const info = GqlExecutionContext.create(context).getInfo();
    // const operationName = info.path.key;
    // if (BYPASS_OPERATIONS.includes(operationName)) {
    //   return true;
    // }
    // const authorizationHeader = ctx.req.headers.authorization;
    // if (authorizationHeader) {
    //   const token = authorizationHeader.split(' ')[1];
    //   try {
    //     const decodedUser: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //     if (decodedUser?.id) {
    //       const { hash, ...user } = await this.userService.getUserById(
    //         decodedUser.id,
    //       );
    //       ctx.user = user;
    //       return true;
    //     }
    //     return false;
    //   } catch (error) {
    //     throw new HttpException(
    //       'Invalid Token' + error.message,
    //       HttpStatus.UNAUTHORIZED,
    //     );
    //   }
    // } else {
    //   return false;
    // }
    return true;
  }
}
