import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';
import {
  PaginationInput,
  PaginationOutput,
} from '@/common/dtos/pagination.dto';
import { TaxonomyEntity } from '@/modules/taxonomy/entity/taxonomy.entity';
import { TaxonomyType } from '@/modules/taxonomy/enum/taxonomy-type.enum';

@InputType()
export class SearchTaxonomyInput extends PaginationInput {
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  ids?: string[];

  @Field(() => TaxonomyType, { nullable: true })
  @IsOptional()
  @IsEnum(TaxonomyType)
  type?: TaxonomyType;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  text?: string;
}

@ObjectType()
export class SearchTaxonomyOutput extends PaginationOutput {
  @Field(() => [TaxonomyEntity], { nullable: true })
  results?: TaxonomyEntity[];
}
