import { InternalServerErrorException } from '@nestjs/common';
import {
  AggregateRoot,
  CommandHandler,
  EventPublisher,
  ICommandHandler,
  IEvent,
} from '@nestjs/cqrs';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { DeleteTaxonomyCommand } from '@/modules/taxonomy/command/delete-taxonomy/delete-taxonomy.command';
import { DeleteTaxonomyEvent } from '@/modules/taxonomy/event/delete-taxonomy.event/delete-taxonomy.event';
import { TaxonomyRepository } from '@/modules/taxonomy/taxonomy.repository';

@CommandHandler(DeleteTaxonomyCommand)
export class DeleteTaxonomyHandler
  implements ICommandHandler<DeleteTaxonomyCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly taxonomyRepository: TaxonomyRepository,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async execute({ data }: DeleteTaxonomyCommand) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.taxonomyRepository.delete(data.id);
      await this.taxonomyRepository.detachParentReference(data.id);
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(error);
    }
  }
}
