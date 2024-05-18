// taxonomy-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { TAXONOMY_NOT_FOUND } from '@/modules/taxonomy/constant/error-message.constant';
import {
  SearchTaxonomyInput,
  SearchTaxonomyOutput,
} from '@/modules/taxonomy/dto/search-taxonomy.dto';
import { TaxonomyEntityFactory } from '@/modules/taxonomy/entity/taxonomy.factory';
import { Taxonomy } from '@/modules/taxonomy/model/taxonomy.model';
import { SearchTaxonomyQuery } from '@/modules/taxonomy/query/search-taxonomy/search-taxonomy.query';

@Injectable()
export class SearchTaxonomyUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly taxonomyFactory: TaxonomyEntityFactory,
  ) {}

  async searchTaxonomy(
    input: SearchTaxonomyInput,
  ): Promise<SearchTaxonomyOutput> {
    try {
      const searchData: {
        results: Taxonomy[];
        totalPages: number;
        totalCount: number;
      } = await this.queryBus.execute(new SearchTaxonomyQuery(input));
      const entityList = searchData?.results.map(tx =>
        this.taxonomyFactory.create(tx),
      );

      return {
        success: true,
        results: entityList,
        totalCount: searchData.totalCount,
        totalPages: searchData.totalPages,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
