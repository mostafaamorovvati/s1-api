import { AggregateRoot, IEvent } from '@nestjs/cqrs';

export class DeleteTaxonomyEvent {
  constructor(public readonly taxonomyId: string) {}
}
