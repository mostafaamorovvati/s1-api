import { DeleteTaxonomyInput } from '@/modules/taxonomy/dto/delete-taxonomy.dto';

export class DeleteTaxonomyCommand {
  constructor(public readonly data: DeleteTaxonomyInput) {}
}
