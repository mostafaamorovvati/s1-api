// taxonomy-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { DeleteTaxonomyCommand } from '@/modules/taxonomy/command/delete-taxonomy';
import {
  DeleteTaxonomyInput,
  DeleteTaxonomyOutput,
} from '@/modules/taxonomy/dto/delete-taxonomy.dto';
import { TaxonomyHelper } from '@/modules/taxonomy/helper/taxonomy.helper';

@Injectable()
export class DeleteTaxonomyUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly taxonomyHelper: TaxonomyHelper,
  ) {}

  async deleteTaxonomy(
    input: DeleteTaxonomyInput,
  ): Promise<DeleteTaxonomyOutput> {
    try {
      await this.taxonomyHelper.validateTaxonomyDelete({ id: input.id });
      await this.commandBus.execute(new DeleteTaxonomyCommand(input));
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
