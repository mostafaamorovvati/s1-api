import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserWithGoogleCommand } from '@/modules/user/command/create-user-with-google/create-user-with-google.command';
import { UserRepository } from '@/modules/user/user.repository';

@CommandHandler(CreateUserWithGoogleCommand)
export class CreateUserWithgoogleHandler
  implements ICommandHandler<CreateUserWithGoogleCommand>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ email, displayName, googleId }: CreateUserWithGoogleCommand) {
    return this.userRepository.createUserWithGoogle(
      email,
      displayName,
      googleId,
    );
  }
}
