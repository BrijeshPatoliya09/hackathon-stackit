import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { CreateUserInput } from './dto/create-user.input';
import { generatePassword, jwtGetToken } from 'src/utils/helper';
import { AbstractService } from 'src/utils/abstract.service';
import { userRepository } from './repository/user-session.repository';

@Injectable()
export class UserService extends AbstractService {
  constructor() {
    super(userRepository);
  }

  getUserByEmail(email: string): Promise<User> {
    return userRepository.findOne({ where: { email } });
  }

  async createUser(user: CreateUserInput): Promise<String> {
    const newUser = this.repository.create(user);
    newUser.password = await generatePassword(user.password);
    const { id } = await this.abstractCreate(newUser);
    return jwtGetToken(id);
  }

  async getUserById(id: string): Promise<User> {
    return await userRepository.findOne({ where: { id } });
  }

  async getUsers(CreateUserInput, relations: string[] = null): Promise<User[]> {
    const sts = await userRepository.find({
      where: {
        id: Not(CreateUserInput.id),
      },
      select: {
        password: false,
      },
      relations,
    });
    return sts;
  }
}
