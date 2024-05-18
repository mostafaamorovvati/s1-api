import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { TUser } from '@/modules/user/entity/user.entity';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): TUser | undefined => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    return user;
  },
);
