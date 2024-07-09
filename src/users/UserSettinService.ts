import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../graphql/models/User';
import { UserSetting } from '../graphql/models/UserSetting';
import { CreateUserSettingsInput } from '../graphql/utils/CreateUserSettingsInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUserSetingById(userId: number) {
    return this.userSettingRepository.findOneBy({ userId });
  }
  async createUserSetting(createUserSettingsData: CreateUserSettingsInput) {
    const findUser = await this.userRepository.findOneBy({
      id: createUserSettingsData.userId,
    });

    if (!findUser) throw new Error('User not found');

    const newUserSetting = this.userSettingRepository.create(
      createUserSettingsData,
    );
    const savedSetting = await this.userSettingRepository.save(newUserSetting);
    findUser.settings = savedSetting;
    await this.userRepository.save(findUser);

    return savedSetting;
  }
}
