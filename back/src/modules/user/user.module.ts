import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { User } from './entity/users.entity';

@Module({
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
