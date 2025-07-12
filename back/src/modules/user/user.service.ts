import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { CreateUserInput } from './dto/create-user.input';
import { generatePassword, jwtGetToken } from 'src/utils/helper';
import { AbstractService } from 'src/utils/abstract.service';
import { userRepository } from './repository/user-session.repository';

@Injectable()
export class UserService extends AbstractService {
  constructor() {
    super(userRepository);
  }

  getUserByEmail(email: string): Promise<Users> {
    return userRepository.findOne({ where: { email } });
  }

  async createUser(users: CreateUserInput): Promise<string> {
    const existingUser = await this.repository.findOne({
      where: [{ email: users.email }, { username: users.username }],
    });

    if (existingUser) {
      const duplicates = [];
      if (existingUser.email === users.email) duplicates.push('email');
      if (existingUser.username === users.username) duplicates.push('username');

      throw new BadRequestException(
        `Duplicate ${duplicates.join(' and ')} not allowed`,
      );
    }

    users.hash = await generatePassword(users.hash);
    const { id } = await this.abstractCreate(users);
    return jwtGetToken(id);
  }

  async getUserById(id: number): Promise<Users> {
    return await userRepository.findOne({ where: { id } });
  }

  async getUsers(
    CreateUserInput,
    relations: string[] = null,
  ): Promise<Users[]> {
    const sts = await userRepository.find({
      where: {
        id: Not(CreateUserInput.id),
      },
      select: {
        hash: false,
      },
      relations,
    });
    return sts;
  }
}
