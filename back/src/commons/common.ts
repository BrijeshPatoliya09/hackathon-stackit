import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
export enum ErrorType {
  TokenExpiredError = 'TokenExpiredError',
}
