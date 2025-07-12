import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { Users } from './entity/users.entity';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, UserResolver],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
