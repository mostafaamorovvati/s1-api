import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';
import { CreateTaxonomyInput } from '@/modules/taxonomy/dto/create-taxonomy.dto';
import { TaxonomyEntity } from '@/modules/taxonomy/entity/taxonomy.entity';
import { Taxonomy } from '@/modules/taxonomy/model/taxonomy.model';
import { TaxonomyRepository } from '@/modules/taxonomy/taxonomy.repository';

@Injectable()
export class TaxonomyFactory implements ModelFactory<Taxonomy> {
  private readonly CREATED_AT = null;
  private readonly UPDATED_AT = null;
  constructor(private readonly taxonomyRepository: TaxonomyRepository) {}

  async create(input: CreateTaxonomyInput): Promise<Taxonomy> {
    const { parent = null, slug, title, description = null, type } = input;
    const postCount = 0;
    const taxonomy = new Taxonomy(
      new ObjectId().toHexString(),
      title,
      slug,
      type,
      parent,
      postCount,
      description,
      this.CREATED_AT,
      this.UPDATED_AT,
    );
    await this.taxonomyRepository.create(taxonomy);
    return taxonomy;
  }
}
