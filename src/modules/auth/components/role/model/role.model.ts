import { Injectable } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

@Injectable()
export class RoleModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly title: string,
    private readonly permissions: string[],
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

  getPermissions(): string[] {
    return this.permissions;
  }
}
