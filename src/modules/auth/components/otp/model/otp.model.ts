import { Injectable } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OtpModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly phone: string,
    private readonly email: string,
    private readonly code: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getPhone(): string {
    return this.phone;
  }

  getEmail(): string {
    return this.email;
  }

  getCode(): string {
    return this.code;
  }

  validateCode(code: string) {
    return this.code && bcrypt.compare(code, this.code);
  }
}
