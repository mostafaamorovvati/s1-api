export class SignupCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly displayName: string,
    public readonly phone: string,
  ) {}
}
