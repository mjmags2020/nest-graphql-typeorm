import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './graphql/models/User';
import { UserSetting } from './graphql/models/UserSetting';
import { UsersModule } from './users/users.module';

console.log('NODE_ENV', process.env.NODE_ENV);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database:
        process.env.NODE_ENV === 'TEST' ? process.env.DB_TEST : process.env.DB,
      entities: [User, UserSetting],
      logging: false,
      synchronize: true, // true if only good for DEV
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
