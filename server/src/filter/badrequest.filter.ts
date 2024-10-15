import { Catch, httpError, HttpStatus } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { BaseErrorFilter } from './base.filter';

@Catch(httpError.BadRequestError)
export class BadRequestFilter extends BaseErrorFilter {
  constructor() {
    super(HttpStatus.BAD_REQUEST);
  }

  override log(message: string, err: Error, ctx: Context) {
    ctx.logger.debug(`BAD Request: ${message}`, err);
  }
}
