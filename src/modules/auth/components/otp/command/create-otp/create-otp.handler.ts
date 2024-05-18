import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';

import { DeleteOtpCommand } from '@/modules/auth/components/otp/command/delete-otp/delete-otp.command';
import { OtpModel } from '@/modules/auth/components/otp/model/otp.model';
import { FindOtpByPhoneQuery } from '@/modules/auth/components/otp/query/find-otp-by-phone/find-otp-by-phone.query';

import { OtpModelFactory } from '../../model/otp-model.factory';
import { CreateOtpCommand } from './create-otp.command';

@CommandHandler(CreateOtpCommand)
export class CreateOtpHandler implements ICommandHandler<CreateOtpCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly otpModelFactory: OtpModelFactory,
  ) {}

  async execute(command: CreateOtpCommand) {
    const { createOtpInput } = command;

    const otp: OtpModel = await this.queryBus.execute(
      new FindOtpByPhoneQuery(createOtpInput.phone),
    );

    if (otp) {
      await this.commandBus.execute(new DeleteOtpCommand({ id: otp.getId() }));
    }

    await this.otpModelFactory.create(createOtpInput);
  }
}
