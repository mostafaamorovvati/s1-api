import { Injectable } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

@Injectable()
export class PermissionModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly title: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getTitle(): string {
    return this.title;
  }
}
