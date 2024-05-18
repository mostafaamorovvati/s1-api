export class CreateUserWithGoogleCommand {
  constructor(
    public readonly email: string,
    public readonly displayName: string,
    public readonly googleId: string,
  ) {}
}
