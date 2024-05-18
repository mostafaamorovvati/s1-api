import { CreateTaxonomyInput } from '@/modules/taxonomy/dto/create-taxonomy.dto';

export class CreateTaxonomyCommand {
  constructor(public readonly data: CreateTaxonomyInput) {}
}
