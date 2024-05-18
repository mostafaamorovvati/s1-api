// taxonomy-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { TAXONOMY_NOT_FOUND } from '@/modules/taxonomy/constant/error-message.constant';
import { FindTaxonomyOutput } from '@/modules/taxonomy/dto/find-taxonomy.dto';
import { TaxonomyEntityFactory } from '@/modules/taxonomy/entity/taxonomy.factory';
import { FindTaxonomyByIdQuery } from '@/modules/taxonomy/query/find-taxonomy-by-id/find-taxonomy-by-id.query';
import { FindTaxonomyBySlugQuery } from '@/modules/taxonomy/query/find-taxonomy-by-slug/find-taxonomy-by-slug.query';

@Injectable()
export class FindTaxonomyBySlugUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly taxonomyFactory: TaxonomyEntityFactory,
  ) {}

  async findTaxonomyBySlug(slug: string): Promise<FindTaxonomyOutput> {
    try {
      const taxonomy = await this.queryBus.execute(
        new FindTaxonomyBySlugQuery(slug),
      );
      if (!taxonomy) {
        throw new NotFoundException(TAXONOMY_NOT_FOUND);
      }
      return {
        success: true,
        result: this.taxonomyFactory.create(taxonomy),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
