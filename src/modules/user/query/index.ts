import { FindUserByEmailHandler } from '@/modules/user/query/find-user-by-email/find-user-by-email.handler';
import { FindUserByEmailAndIsVerifiedHandler } from '@/modules/user/query/find-user-by-email-and-is-verified/find-user-by-email-and-is-verified.handler';
import { FindUserbyIdHandler } from '@/modules/user/query/find-user-by-id/find-user-by-id.handler';
import { SearchUserHanler } from '@/modules/user/query/search-user/search-user.handler';

import { FindUserByPhoneHandler } from './find-user-by-phone/find-user-by-phone.handler';
import { FindUserByPhoneAndIsVerifiedHandler } from './find-user-by-phone-and-is-verified/find-user-by-phone-and-is-verified.handler';
import { FindUsersByRoleHandler } from './find-users-by-role/find-users-by-role.handler';

export const QueryHandlers = [
  FindUserbyIdHandler,
  FindUserByEmailHandler,
  FindUserByPhoneHandler,
  FindUserByPhoneAndIsVerifiedHandler,
  FindUserByEmailAndIsVerifiedHandler,
  FindUsersByRoleHandler,
  SearchUserHanler,
];
