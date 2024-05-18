import { BadRequestException } from '@nestjs/common';
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';

import { SignupCommand } from '@/modules/auth/command/signup/signup.command';
import { CreateUserCommand } from '@/modules/user/command/create-user';
import { USER_ALREADY_EXISTS } from '@/modules/user/constant/error-message.constant';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByEmailQuery } from '@/modules/user/query/find-user-by-email/find-user-by-email.query';
import { FindUserByPhoneQuery } from '@/modules/user/query/find-user-by-phone/find-user-by-phone.query';

@CommandHandler(SignupCommand)
export class SignupHandler implements ICommandHandler<SignupCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: SignupCommand) {
    let user: UserModel;
    user = await this.queryBus.execute(new FindUserByPhoneQuery(command.phone));
    if (user) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }

    user = await this.queryBus.execute(new FindUserByEmailQuery(command.email));
    if (user) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }
    await this.commandBus.execute(new CreateUserCommand(command));
  }
}
