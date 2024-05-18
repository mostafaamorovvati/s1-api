// taxonomy-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateTaxonomyCommand } from '@/modules/taxonomy/command/create-taxonomy';
import {
  CreateTaxonomyInput,
  CreateTaxonomyOutput,
} from '@/modules/taxonomy/dto/create-taxonomy.dto';
import { TaxonomyHelper } from '@/modules/taxonomy/helper/taxonomy.helper';

@Injectable()
export class CreateTaxonomyUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly taxonomyHelper: TaxonomyHelper,
  ) {}

  async createTaxonomy(
    input: CreateTaxonomyInput,
  ): Promise<CreateTaxonomyOutput> {
    try {
      await this.taxonomyHelper.validateTaxonomy({
        slug: input.slug,
        parent: input.parent,
      });

      await this.commandBus.execute(new CreateTaxonomyCommand(input));
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
