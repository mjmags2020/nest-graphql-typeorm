import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSettingService } from './UserSettinService';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { UserSettingResolver } from 'src/graphql/resolvers/UserSettingResolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  controllers: [],
  providers: [
    UserResolver,
    UserSettingResolver,
    UserService,
    UserSettingService,
  ],
})
export class UsersModule {}
