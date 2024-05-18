import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';

import { Schema } from '@/common/decorators/schema.decorator';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { TaxonomyType } from '@/modules/taxonomy/enum/taxonomy-type.enum';

@InputType('TaxonomyInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.TAXONOMY })
export class TaxonomyEntity extends DefaultEntity {
  @Prop()
  @Field(() => String)
  @IsString()
  title: string;

  @Prop()
  @Field(() => String)
  @IsString()
  slug: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CollectionName.TAXONOMY })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNumber()
  parent?: ObjectId;

  @Prop({
    type: Number,
    default: 0,
  })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  postCount?: number;

  @Prop()
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Prop({
    type: String,
    enum: [...Object.values(TaxonomyType)],
    isRequired: true,
  })
  @Field(() => TaxonomyType)
  @IsEnum(TaxonomyType)
  type: TaxonomyType;
}

type TTaxonomy = Document<TaxonomyEntity>;
const TaxonomySchema = SchemaFactory(TaxonomyEntity);
TaxonomySchema.index({ title: 'text' });

export { TaxonomySchema, TTaxonomy };
