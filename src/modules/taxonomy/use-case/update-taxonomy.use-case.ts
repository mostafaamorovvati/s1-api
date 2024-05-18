// taxonomy-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { UpdateTaxonomyCommand } from '@/modules/taxonomy/command/update-taxonomy';
import {
  UpdateTaxonomyInput,
  UpdateTaxonomyOutput,
} from '@/modules/taxonomy/dto/update-taxonomy.dto';
import { TaxonomyHelper } from '@/modules/taxonomy/helper/taxonomy.helper';

@Injectable()
export class UpdateTaxonomyUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly taxonomyHelper: TaxonomyHelper,
  ) {}

  async updateTaxonomy(
    input: UpdateTaxonomyInput,
  ): Promise<UpdateTaxonomyOutput> {
    try {
      await this.taxonomyHelper.validateTaxonomyUpdate({
        id: input.id,
        slug: input.slug,
        parent: input.parent,
      });
      await this.commandBus.execute(new UpdateTaxonomyCommand(input));
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
