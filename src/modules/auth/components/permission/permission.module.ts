import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommandHandlers } from '@/modules/auth/components/permission/command';
import {
  PermissionEntity,
  PermissionEntitySchema,
} from '@/modules/auth/components/permission/entity/permission.entity';
import { PermissionEntityFactory } from '@/modules/auth/components/permission/entity/permission.factory';
import { PermissionHelepr } from '@/modules/auth/components/permission/helper/permission-helper';
import { PermissionModelFactory } from '@/modules/auth/components/permission/model/permission-model.factory';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';
import { PermissionResolvers } from '@/modules/auth/components/permission/permission.resolver';
import { QueryHandlers } from '@/modules/auth/components/permission/query';
import { UseCases } from '@/modules/auth/components/permission/use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: PermissionEntity.name, schema: PermissionEntitySchema },
    ]),
  ],
  providers: [
    ...PermissionResolvers,
    ...CommandHandlers,
    ...QueryHandlers,
    ...UseCases,
    PermissionRepository,
    PermissionModelFactory,
    PermissionEntityFactory,
    PermissionHelepr,
  ],
  exports: [...UseCases, PermissionRepository],
})
@Global()
export class PermissionModule {}
