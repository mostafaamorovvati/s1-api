import { UpdateTaxonomyInput } from '@/modules/taxonomy/dto/update-taxonomy.dto';

export class UpdateTaxonomyCommand {
  constructor(public readonly data: UpdateTaxonomyInput) {}
}
