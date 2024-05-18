import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommandHandlers } from '@/modules/auth/components/role/command';
import {
  RoleEntity,
  RoleEntitySchema,
} from '@/modules/auth/components/role/entity/role.entity';
import { RoleEntityFactory } from '@/modules/auth/components/role/entity/role.factory';
import { RoleHelepr } from '@/modules/auth/components/role/helper/role-helper';
import { RoleModelFactory } from '@/modules/auth/components/role/model/role-model.factory';
import { QueryHandlers } from '@/modules/auth/components/role/query';
import RoleDataLoader from '@/modules/auth/components/role/role.loader';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';
import { RoleResolvers } from '@/modules/auth/components/role/role.resolver';
import { UseCases } from '@/modules/auth/components/role/use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: RoleEntity.name, schema: RoleEntitySchema },
    ]),
  ],
  providers: [
    ...RoleResolvers,
    ...CommandHandlers,
    ...QueryHandlers,
    ...UseCases,
    RoleDataLoader,
    RoleRepository,
    RoleModelFactory,
    RoleEntityFactory,
    RoleHelepr,
  ],
  exports: [...UseCases, RoleRepository],
})
@Global()
export class RoleModule {}
