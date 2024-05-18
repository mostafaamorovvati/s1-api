import { DeleteUserInput } from '@/modules/user/dto/delete-user.dto';

export class DeleteUserCommand {
  constructor(public readonly deleteUserInput: DeleteUserInput) {}
}
