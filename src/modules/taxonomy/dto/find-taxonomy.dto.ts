import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { TaxonomyEntity } from '@/modules/taxonomy/entity/taxonomy.entity';

@InputType()
export class FindTaxonomyInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class FindTaxonomyBySlugInput {
  @Field(() => String)
  slug: string;
}

@ObjectType()
export class FindTaxonomyOutput extends CoreOutput {
  @Field(() => TaxonomyEntity, { nullable: true })
  result?: TaxonomyEntity;
}
