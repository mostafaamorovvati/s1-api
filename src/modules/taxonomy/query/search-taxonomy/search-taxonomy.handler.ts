import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchTaxonomyOutput } from '@/modules/taxonomy/dto/search-taxonomy.dto';
import { Taxonomy } from '@/modules/taxonomy/model/taxonomy.model';
import { TaxonomyRepository } from '@/modules/taxonomy/taxonomy.repository';

import { SearchTaxonomyQuery } from './search-taxonomy.query';

@QueryHandler(SearchTaxonomyQuery)
export class SearchTaxonomyHandler
  implements IQueryHandler<SearchTaxonomyQuery>
{
  constructor(private readonly taxonomyRepository: TaxonomyRepository) {}

  async execute({ data }: SearchTaxonomyQuery) {
    return this.taxonomyRepository.search(data);
  }
}
