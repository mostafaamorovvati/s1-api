// taxonomy-registration.use-case.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  TAXONOMY_NOT_FOUND,
  TAXONOMY_PARENT_NOT_FOUND,
  TAXONOMY_SLUG_DUPLICATED,
} from '@/modules/taxonomy/constant/error-message.constant';
import { TaxonomyEntityFactory } from '@/modules/taxonomy/entity/taxonomy.factory';
import { Taxonomy } from '@/modules/taxonomy/model/taxonomy.model';
import { FindTaxonomyByIdQuery } from '@/modules/taxonomy/query/find-taxonomy-by-id/find-taxonomy-by-id.query';
import { FindTaxonomyBySlugQuery } from '@/modules/taxonomy/query/find-taxonomy-by-slug/find-taxonomy-by-slug.query';

@Injectable()
export class TaxonomyHelper {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly taxonomyFactory: TaxonomyEntityFactory,
  ) {}

  async validateTaxonomy({ parent, slug }: { parent?: string; slug: string }) {
    const taxonomyParent = parent
      ? await this.queryBus.execute(new FindTaxonomyByIdQuery(parent))
      : null;
    if (parent && !taxonomyParent)
      throw new NotFoundException(TAXONOMY_PARENT_NOT_FOUND);

    const taxonomy = await this.queryBus.execute(
      new FindTaxonomyBySlugQuery(slug),
    );
    if (taxonomy) throw new ConflictException(TAXONOMY_SLUG_DUPLICATED);
  }

  async validateTaxonomyUpdate({
    id,
    parent,
    slug,
  }: {
    id: string;
    parent?: string;
    slug?: string;
  }) {
    const taxonomy: Taxonomy = await this.queryBus.execute(
      new FindTaxonomyByIdQuery(id),
    );
    if (!taxonomy) throw new NotFoundException(TAXONOMY_NOT_FOUND);

    if (parent) {
      const taxonomyParent = await this.queryBus.execute(
        new FindTaxonomyByIdQuery(parent),
      );
      if (!taxonomyParent)
        throw new NotFoundException(TAXONOMY_PARENT_NOT_FOUND);
    }

    if (slug && slug !== taxonomy.getSlug()) {
      const taxonomyBySlug = await this.queryBus.execute(
        new FindTaxonomyBySlugQuery(slug),
      );
      if (taxonomyBySlug) throw new ConflictException(TAXONOMY_SLUG_DUPLICATED);
    }
  }

  async validateTaxonomyDelete({ id }: { id: string }) {
    const taxonomy = await this.queryBus.execute(new FindTaxonomyByIdQuery(id));
    if (!taxonomy) throw new NotFoundException(TAXONOMY_NOT_FOUND);
  }
}
