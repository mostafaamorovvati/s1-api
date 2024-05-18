import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class DeleteUserInput {
  @Field(() => String)
  @IsObjectId()
  userId: string;
}

@ObjectType()
export class DeleteUserOutput extends CoreOutput {}
