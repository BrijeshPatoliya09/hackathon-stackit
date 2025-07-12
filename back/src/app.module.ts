import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { graphQLConfig } from './configs/graphQL';
import { AppResolver } from './app.resolver';
import { ApplicationModules } from './modules/application.module';

@Module({
  imports: [
    GraphQLModule.forRoot(graphQLConfig()),
    ...ApplicationModules,
  ],
  providers: [AppResolver],
})
export class AppModule {}
