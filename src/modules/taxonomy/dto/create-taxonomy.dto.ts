import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';
import { TaxonomyEntity } from '@/modules/taxonomy/entity/taxonomy.entity';

@InputType()
export class CreateTaxonomyInput extends PickType(TaxonomyEntity, [
  'title',
  'slug',
  'type',
] as const) {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  parent?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}

@ObjectType()
export class CreateTaxonomyOutput extends CoreOutput {}
