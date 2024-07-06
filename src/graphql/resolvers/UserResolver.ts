import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from 'src/_mocks_/mockUsers';
import { UserSetting } from '../models/UserSetting';
import { mockUserSettings } from 'src/_mocks_/mockUserSettings';
import { CreaeUserInput } from '../utils/CreateUserInput';

export let incrementalId = 3;

@Resolver((of) => User)
export class UserResolver {
  @Query((retursn) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return mockUsers.find((item) => item.id === id);
  }

  @Query(() => [User])
  getUsers() {
    return mockUsers;
  }

  @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: User) {
    console.log(user);
    return mockUserSettings.find((item) => item.userId === user.id);
  }
  @Mutation((returns) => User)
  createUser(
    // @Args('username') username: string,
    // @Args('displayName', { nullable: true }) displayName: string,
    @Args('createUserData') createUserData: CreaeUserInput,
  ) {
    const { username, displayName } = createUserData;
    const newUser = { username, displayName, id: ++incrementalId };
    mockUsers.push(newUser);
    return newUser;
  }
}
