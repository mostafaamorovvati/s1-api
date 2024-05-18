import { registerEnumType } from '@nestjs/graphql';

export enum TaxonomyType {
  CATEGORY = 'category',
  TAG = 'tag',
}

registerEnumType(TaxonomyType, {
  name: 'TaxonomyType',
});
