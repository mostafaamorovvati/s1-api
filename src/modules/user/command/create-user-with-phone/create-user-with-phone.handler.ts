import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../user.repository';
import { UserModel } from '../../model/user.model';
import { CreateUserWithPhoneCommand } from './create-user-with-phone.command';

@CommandHandler(CreateUserWithPhoneCommand)
export class CreateUserWithPhoneHandler
  implements ICommandHandler<CreateUserWithPhoneCommand>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserWithPhoneCommand): Promise<UserModel> {
    const { phone } = command;
    return this.userRepository.createWithPhone(phone);
  }
}
