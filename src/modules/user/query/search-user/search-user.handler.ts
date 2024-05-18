import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchUserOutput } from '@/modules/user/dto/search-user.dto';
import { SearchUserQuery } from '@/modules/user/query/search-user/search-user.query';
import { UserRepository } from '@/modules/user/user.repository';

@QueryHandler(SearchUserQuery)
export class SearchUserHanler implements IQueryHandler<SearchUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({
    searchUserInput,
  }: SearchUserQuery): Promise<SearchUserOutput> {
    const result = this.userRepository.search(searchUserInput);
    return result;
  }
}
