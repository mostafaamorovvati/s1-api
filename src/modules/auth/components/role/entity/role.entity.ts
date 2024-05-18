import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsString } from 'class-validator';

import { Schema } from '@/common/decorators/schema.decorator';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { PermissionEntity } from '@/modules/auth/components/permission/entity/permission.entity';

@InputType('RoleInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.ROLE })
export class RoleEntity extends DefaultEntity {
  @Field(() => String, { nullable: true })
  @Prop(() => String)
  name?: string;

  @Field(() => String, { nullable: true })
  @Prop(() => String)
  title?: string;

  @Field(() => [PermissionEntity], { nullable: true })
  @Prop({ type: [String] })
  @IsString({ each: true })
  permissions?: string[];
}

type TRoleEntity = Document<RoleEntity>;
const RoleEntitySchema = SchemaFactory(RoleEntity);

RoleEntitySchema.index({ name: 'text', title: 'text' });
RoleEntitySchema.index({ name: 1, title: 1 });

export { RoleEntitySchema, TRoleEntity };
