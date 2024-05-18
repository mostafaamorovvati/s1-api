import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';
import { TaxonomyEntity } from '@/modules/taxonomy/entity/taxonomy.entity';
import { Taxonomy } from '@/modules/taxonomy/model/taxonomy.model';

@Injectable()
export class TaxonomyEntityFactory
  implements ModelEntityFactory<TaxonomyEntity, Taxonomy>
{
  create(taxonomy: Taxonomy): TaxonomyEntity {
    const parent = taxonomy.getParent();
    return {
      _id: new ObjectId(taxonomy.getId()),
      title: taxonomy.getTitle(),
      slug: taxonomy.getSlug(),
      parent: parent ? new ObjectId(parent) : null,
      postCount: taxonomy.getPostCount(),
      description: taxonomy.getDescription(),
      type: taxonomy.getType(),
      createdAt: taxonomy.getCreatedAt(),
      updatedAt: taxonomy.getUpdatedAt(),
    };
  }

  createFromEntity(taxonomyEntity: TaxonomyEntity): Taxonomy {
    const {
      _id,
      slug,
      title,
      parent,
      postCount,
      description,
      type,
      createdAt,
      updatedAt,
    } = taxonomyEntity;
    return new Taxonomy(
      _id.toHexString(),
      title,
      slug,
      type,
      parent?.toHexString(),
      postCount,
      description,
      createdAt,
      updatedAt,
    );
  }
}
