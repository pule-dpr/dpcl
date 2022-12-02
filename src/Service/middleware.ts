import type { MiddleWareType } from './interface';

let _global = window as any;

export const responseMiddleware: Array<any> = _global.responseMiddleware || [];
export const responseErrorMiddleware: Array<any> = _global.responseErrorMiddleware || [];

export function registerResponseMiddleware(fn: MiddleWareType): void {
  if (!responseMiddleware.includes(fn)) {
    responseMiddleware.push(fn);
    _global.responseMiddleware = responseMiddleware;
  }
}

export function registerResponseErrorMiddleware(fn: MiddleWareType): void {
  if (!responseErrorMiddleware.includes(fn)) {
    responseErrorMiddleware.push(fn);
    _global.responseErrorMiddleware = responseErrorMiddleware;
  }
}
