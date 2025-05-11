import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext): number => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: { id: number } }>();
    if (!request.user) {
      throw new Error('User not found');
    }
    return request.user?.id;
  },
);
