import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreaeUserInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  displayName: string;
}
