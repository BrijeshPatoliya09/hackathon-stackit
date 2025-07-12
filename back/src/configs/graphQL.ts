import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

const plugin = require('@newrelic/apollo-server-plugin');

export const graphQLConfig = (): ApolloDriverConfig => {
  return {
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    context: ({ req, res }) => {
      return { request: req, response: res };
    },
    plugins: [plugin],
    playground: process.env.MODE === 'DEV',
  };
};
