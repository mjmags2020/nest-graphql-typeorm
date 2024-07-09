import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../models/UserSetting';
import { CreateUserSettingsInput } from '../utils/CreateUserSettingsInput';
import { UserSettingService } from '../../users/UserSettinService';

@Resolver()
export class UserSettingResolver {
  constructor(private userSettingService: UserSettingService) {}

  @Mutation((returns) => UserSetting)
  async createUserSettings(
    @Args('CreateUserSettingsData')
    CreateUserSettingsData: CreateUserSettingsInput,
  ) {
    const userSetting = await this.userSettingService.createUserSetting(
      CreateUserSettingsData,
    );
    return userSetting;
  }
}
