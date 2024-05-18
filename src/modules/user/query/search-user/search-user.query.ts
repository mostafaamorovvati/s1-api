import { SearchUserInput } from '@/modules/user/dto/search-user.dto';

export class SearchUserQuery {
  constructor(readonly searchUserInput: SearchUserInput) {}
}
