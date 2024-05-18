import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Taxonomy } from '@/modules/taxonomy/model/taxonomy.model';
import { FindTaxonomyByIdQuery } from '@/modules/taxonomy/query/find-taxonomy-by-id/find-taxonomy-by-id.query';
import { TaxonomyRepository } from '@/modules/taxonomy/taxonomy.repository';

@QueryHandler(FindTaxonomyByIdQuery)
export class FindTaxonomyByIdHandler
  implements IQueryHandler<FindTaxonomyByIdQuery>
{
  constructor(private readonly taxonomyRepository: TaxonomyRepository) {}

  async execute({ id }: FindTaxonomyByIdQuery): Promise<Taxonomy | null> {
    return this.taxonomyRepository.findById({ id });
  }
}
