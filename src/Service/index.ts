import { http, httpMultiPartInstance, httpXMLInstance } from './http';
import type { IServiceInterface } from './interface';
import { registerResponseMiddleware, registerResponseErrorMiddleware } from './middleware';

const Service = {
  http,
  httpXMLInstance,
  httpMultiPartInstance,
  registerResponseMiddleware,
  registerResponseErrorMiddleware,
} as IServiceInterface;

export default Service;
