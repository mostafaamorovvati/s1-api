import { CreateTaxonomyHandler } from '@/modules/taxonomy/command/create-taxonomy';
import { DeleteTaxonomyHandler } from '@/modules/taxonomy/command/delete-taxonomy';
import { UpdateTaxonomyHandler } from '@/modules/taxonomy/command/update-taxonomy';

export const CommandHandlers = [
  CreateTaxonomyHandler,
  UpdateTaxonomyHandler,
  DeleteTaxonomyHandler,
];
