import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType()
export class GetProfileInput {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@ObjectType()
export class GetProfileOutput extends CoreOutput {
  @Field(() => UserEntity, { nullable: true })
  result?: UserEntity;
}
