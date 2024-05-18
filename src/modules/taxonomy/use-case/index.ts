import { CreateTaxonomyUseCase } from './create-taxonomy.use-case';
import { DeleteTaxonomyUseCase } from './delete-taxonomy.use-case';
import { FindTaxonomyByIdUseCase } from './find-taxonomy.use-case';
import { FindTaxonomyBySlugUseCase } from './find-taxonomy-by-slug.use-case';
import { SearchTaxonomyUseCase } from './search-taxonomy.use-case';
import { UpdateTaxonomyUseCase } from './update-taxonomy.use-case';

export const UseCases = [
  CreateTaxonomyUseCase,
  FindTaxonomyByIdUseCase,
  SearchTaxonomyUseCase,
  FindTaxonomyBySlugUseCase,
  DeleteTaxonomyUseCase,
  UpdateTaxonomyUseCase,
];
