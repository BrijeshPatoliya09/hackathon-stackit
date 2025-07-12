import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { AuthGuard } from '../auth/auth.guard';
import { jwtGetToken } from 'src/utils/helper';
import { Users } from './entity/users.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create user
  @Post('create')
  async createUser(@Body() createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  // Login
  @Post('login')
  @UseGuards(AuthGuard)
  async login(@Request() req): Promise<string> {
    const user: Users = req.user;
    return jwtGetToken(user.id);
  }

  // Get current user
  @Get('me')
  // @UseGuards(AuthGuard)
  getCurrentUser(@Request() req): Users {
    return req.user;
  }

  // Get all users (with optional relation loader if needed)
  @Get()
  @UseGuards(AuthGuard)
  async getUsers(@Req() req): Promise<Users[]> {
    const user: Users = req.user;
    // You might want to pass specific relations manually, or from query params
    return this.userService.getUsers(user, []);
  }
}
