import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export type RsponseType = AxiosRequestConfig & { requestId?: string; cancelHttp?: (cancel: Function) => void; loggerIndex?: number };

export type XHRResponse = {
  url: string;
  method: string;
  data?: any;
  headers?: any;
  cancelHttp?: any;
  isAsync?: boolean;
  requestId?: string;
};

export type MiddleWareType = (config: AxiosResponse<any>) => any;

export type IServiceInterface = {
  http(options: RsponseType): Promise<any>;
  httpXMLInstance(options: XHRResponse): Promise<any>;
  httpMultiPartInstance: AxiosInstance;
  registerResponseMiddleware(fn: MiddleWareType): void;
  registerResponseErrorMiddleware(fn: MiddleWareType): void;
};
