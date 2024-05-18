import { AggregateRoot } from '@nestjs/cqrs';

import { UpdateTaxonomyInput } from '@/modules/taxonomy/dto/update-taxonomy.dto';
import { TaxonomyType } from '@/modules/taxonomy/enum/taxonomy-type.enum';

export class Taxonomy extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private title: string,
    private slug: string,
    private type: TaxonomyType,
    private parent: string | null,
    private postCount: number,
    private description: string | null,
    private readonly createdAt: string | null,
    private readonly updatedAt: string | null,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getTitle(): string {
    return this.title;
  }

  getSlug(): string {
    return this.slug;
  }

  getParent(): string | null {
    return this.parent;
  }

  getPostCount(): number {
    return this.postCount;
  }

  getDescription(): string | null {
    return this.description;
  }

  getType(): TaxonomyType {
    return this.type;
  }

  getCreatedAt(): string {
    return this.createdAt;
  }
  getUpdatedAt(): string {
    return this.updatedAt;
  }

  updateTaxonomy({
    title,
    type,
    description,
    parent,
    slug,
  }: UpdateTaxonomyInput) {
    title && (this.title = title);
    slug && (this.slug = slug);
    type && (this.type = type);
    (parent || parent === null) && (this.parent = parent);
    (description || description === null) && (this.description = description);
  }
}
