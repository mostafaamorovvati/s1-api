// taxonomy-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { TAXONOMY_NOT_FOUND } from '@/modules/taxonomy/constant/error-message.constant';
import { FindTaxonomyOutput } from '@/modules/taxonomy/dto/find-taxonomy.dto';
import { TaxonomyEntityFactory } from '@/modules/taxonomy/entity/taxonomy.factory';
import { FindTaxonomyByIdQuery } from '@/modules/taxonomy/query/find-taxonomy-by-id/find-taxonomy-by-id.query';

@Injectable()
export class FindTaxonomyByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly taxonomyFactory: TaxonomyEntityFactory,
  ) {}

  async findTaxonomyById(id: string): Promise<FindTaxonomyOutput> {
    try {
      const taxonomy = await this.queryBus.execute(
        new FindTaxonomyByIdQuery(id),
      );
      if (!taxonomy) {
        throw new NotFoundException(TAXONOMY_NOT_FOUND);
      }
      return {
        success: true,
        result: this.taxonomyFactory.create(taxonomy),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
