import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommandHandlers } from '@/modules/taxonomy/command';
import {
  TaxonomyEntity,
  TaxonomySchema,
} from '@/modules/taxonomy/entity/taxonomy.entity';
import { TaxonomyEntityFactory } from '@/modules/taxonomy/entity/taxonomy.factory';
import { TaxonomyHelper } from '@/modules/taxonomy/helper/taxonomy.helper';
import { TaxonomyFactory } from '@/modules/taxonomy/model/taxonomy-model.factory';
import { QueryHandlers } from '@/modules/taxonomy/query';
import { TaxonomyRepository } from '@/modules/taxonomy/taxonomy.repository';
import { TaxonomyResolvers } from '@/modules/taxonomy/taxonomy.resolver';
import { UseCases } from '@/modules/taxonomy/use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: TaxonomyEntity.name, schema: TaxonomySchema },
    ]),
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...UseCases,
    ...TaxonomyResolvers,
    TaxonomyHelper,
    TaxonomyRepository,
    TaxonomyEntityFactory,
    TaxonomyFactory,
  ],
  exports: [],
})
@Global()
export class TaxonomysModule {}
