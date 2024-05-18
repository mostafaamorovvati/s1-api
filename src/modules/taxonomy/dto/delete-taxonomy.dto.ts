import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';

@InputType()
export class DeleteTaxonomyInput {
  @Field(() => String, { nullable: true })
  @IsString()
  id: string;
}

@ObjectType()
export class DeleteTaxonomyOutput extends CoreOutput {}
