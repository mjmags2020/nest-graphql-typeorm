import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../graphql/models/User';
import { mockUsers } from 'src/_mocks_/mockUsers';
import { UserSetting } from '../graphql/models/UserSetting';
import { mockUserSettings } from 'src/_mocks_/mockUserSettings';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';
import { Inject } from '@nestjs/common';
import { UserService } from './UserService';
import { UserSettingService } from './UserSettinService';

export let incrementalId = 3;

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userSettingService: UserSettingService,
  ) {}
  @Query((retursn) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User])
  async getUsers() {
    return await this.userService.getUsers();
  }

  // @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  // getUserSettings(@Parent() user: User) {
  //   console.log(user);
    
  //   return this.userSettingService.getUserSetingById(user.id);
  // }
  @Mutation((returns) => User)
  createUser(
    // @Args('username') username: string,
    // @Args('displayName', { nullable: true }) displayName: string,
    @Args('createUserData') createUserData: CreateUserInput,
  ) {
    return this.userService.createUser(createUserData);
  }
}