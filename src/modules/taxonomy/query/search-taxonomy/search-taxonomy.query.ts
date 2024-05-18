import { SearchTaxonomyInput } from '@/modules/taxonomy/dto/search-taxonomy.dto';

export class SearchTaxonomyQuery {
  constructor(public readonly data: SearchTaxonomyInput) {}
}
