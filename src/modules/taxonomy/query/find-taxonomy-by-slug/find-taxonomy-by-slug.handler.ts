import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Taxonomy } from '@/modules/taxonomy/model/taxonomy.model';
import { FindTaxonomyBySlugQuery } from '@/modules/taxonomy/query/find-taxonomy-by-slug/find-taxonomy-by-slug.query';
import { TaxonomyRepository } from '@/modules/taxonomy/taxonomy.repository';

@QueryHandler(FindTaxonomyBySlugQuery)
export class FindTaxonomyBySlugHandler
  implements IQueryHandler<FindTaxonomyBySlugQuery>
{
  constructor(private readonly taxonomyRepository: TaxonomyRepository) {}

  async execute({ slug }: FindTaxonomyBySlugQuery): Promise<Taxonomy | null> {
    return this.taxonomyRepository.findBySlug({ slug });
  }
}
