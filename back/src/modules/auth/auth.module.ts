import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { JwtGuard } from './jwt.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthGuard, JwtGuard],
})
export class AuthModule {}
