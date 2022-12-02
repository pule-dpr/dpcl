import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import fetchAdapter from './fetch-adapter';
import * as Middleware from './middleware';
import type { RsponseType, XHRResponse } from './interface';

const CancelToken = Axios.CancelToken;

const config = {
  baseURL: '/',
  timeout: 60 * 1000,
  xhrMode: 'fetch',
  adapter: fetchAdapter,
  headers: {
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8',
  },
};

const httpInstance = Axios.create(config);

/**
 * 请求之前拦截动作
 */
httpInstance.interceptors.request.use(
  (response) => response,
  (error) => console.error(error),
);

/**
 * 请求之后拦截动作
 */
httpInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (Middleware.responseMiddleware.length === 0) {
      return response.data;
    } else {
      Middleware.responseMiddleware.forEach((fn: (config: AxiosResponse<any>) => any) => (response = fn(response)));
      return response;
    }
  },
  function httpUtilErrorRequest(error) {
    if (Middleware.responseErrorMiddleware.length !== 0) {
      Middleware.responseErrorMiddleware.forEach((fn: (config: any) => any) => (error = fn(error)));
      return Promise.reject(error);
    }
    if (!error.response) {
      console.error(error);
      return Promise.reject(error);
    }

    return Promise.reject(error.response);
  },
);

function http({ cancelHttp, ...newOptions }: RsponseType): Promise<any> {
  let cancel;
  const cancelToken = new CancelToken((c) => {
    cancel = c;
    if (cancelHttp) {
      cancelHttp(cancel);
    }
  });

  return httpInstance({ ...newOptions, cancelToken });
}

const httpMultiPartInstance: AxiosInstance = Axios.create({
  timeout: 10 * 60 * 1000,
  adapter: fetchAdapter,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

httpMultiPartInstance.interceptors.response.use(
  (response) => Promise.resolve(response.data),
  (error) => Promise.reject(error),
);

function httpXMLInstance({ url, method = 'GET', data, headers, cancelHttp, isAsync = false }: XHRResponse): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const cancel = () => xhr.abort();
    if (cancelHttp) {
      cancelHttp(cancel);
    }
    xhr.open(method, url, !isAsync);
    if (headers) {
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
        let data;
        try {
          data = JSON.parse(xhr.response);
        } catch (e) {
          data = xhr.response;
        }
        resolve(data);
      }
      if (xhr.readyState === 4 && !(xhr.status === 200 || xhr.status === 304)) {
        reject(xhr);
      }
    };
    xhr.send(data ? JSON.stringify(data) : null);
  });
}

export { http as default, http, httpMultiPartInstance, httpXMLInstance };
