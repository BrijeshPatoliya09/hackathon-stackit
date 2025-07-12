import {
  Args,
  Context,
  Info,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { User } from './entity/users.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { jwtGetToken } from 'src/utils/helper';
import { AuthGuard } from '../auth/auth.guard';
import { getAllRelations } from 'src/commons/helper.function';

@Resolver((_of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((_returns) => String, { name: 'login' })
  @UseGuards(AuthGuard)
  login(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user')
    user: User,
  ) {
    return jwtGetToken(user.id);
  }

  // create user
  @Mutation((_returns) => String, { name: 'createUser' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  // getCurrteUser
  @Query((_returns) => User, { name: 'getCurrentUser' })
  getCurrentUser(@Context('user') user: User) {
    return user;
  }

  @Query((_returns) => [User], { name: 'getUsers' })
  getUsers(@Context('user') user: User, @Info() info) {
    const relations = getAllRelations(info);
    return this.userService.getUsers(user, relations);
  }
}
