import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettingService } from './UserSettinService';
import { User } from '../graphql/models/User';
import { UserSetting } from '../graphql/models/UserSetting';
import { UserSettingResolver } from '../graphql/resolvers/UserSettingResolver';

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
