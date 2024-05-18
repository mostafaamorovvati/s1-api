import { FindTaxonomyByIdHandler } from './find-taxonomy-by-id/find-taxonomy-by-id.handler';
import { FindTaxonomyBySlugHandler } from './find-taxonomy-by-slug/find-taxonomy-by-slug.handler';
import { SearchTaxonomyHandler } from './search-taxonomy/search-taxonomy.handler';

export const QueryHandlers = [
  FindTaxonomyByIdHandler,
  FindTaxonomyBySlugHandler,
  SearchTaxonomyHandler,
];
