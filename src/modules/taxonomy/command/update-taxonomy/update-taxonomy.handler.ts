import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UpdateTaxonomyCommand } from '@/modules/taxonomy/command/update-taxonomy/update-taxonomy.command';
import { TaxonomyRepository } from '@/modules/taxonomy/taxonomy.repository';

@CommandHandler(UpdateTaxonomyCommand)
export class UpdateTaxonomyHandler
  implements ICommandHandler<UpdateTaxonomyCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly taxonomyRepository: TaxonomyRepository,
  ) {}

  async execute({ data }: UpdateTaxonomyCommand) {
    const taxonomy = await this.taxonomyRepository.findById({ id: data.id });
    taxonomy.updateTaxonomy(data);
    await this.taxonomyRepository.update(taxonomy);
  }
}
