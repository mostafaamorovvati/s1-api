import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

import { Schema } from '@/common/decorators/schema.decorator';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';

@InputType('PermissionInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.PERMISSION })
export class PermissionEntity extends DefaultEntity {
  @Field(() => String, { nullable: true })
  @Prop()
  name?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  title?: string;
}

type TPermissionEntity = Document<PermissionEntity>;
const PermissionEntitySchema = SchemaFactory(PermissionEntity);

PermissionEntitySchema.index({ name: 'text', title: 'text' });
PermissionEntitySchema.index({ name: 1, title: 1 });

export { PermissionEntitySchema, TPermissionEntity };
