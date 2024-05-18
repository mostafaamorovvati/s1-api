export class FindUserByEmailQuery {
  constructor(
    public readonly email: string,
    public readonly isPasswordSelected?: boolean,
  ) {}
}
