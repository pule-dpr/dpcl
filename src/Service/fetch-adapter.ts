/// <reference path="../../typings/global.d.ts"/>

import { AxiosRequestConfig, AxiosError, AxiosResponse, AxiosPromise } from 'axios';
import settle from 'axios/lib/core/settle';
import buildURL from 'axios/lib/helpers/buildURL';
import buildFullPath from 'axios/lib/core/buildFullPath';
import CanceledError from 'axios/lib/cancel/CanceledError';
import { isUndefined } from 'lodash-es';

export interface AxiosFetchRequestConfig extends AxiosRequestConfig<BodyInit> {
  mode?: RequestMode;
  body?: BodyInit;
  cache?: RequestCache;
  integrity?: string;
  redirect?: RequestRedirect;
  referrer?: string;
  credentials?: RequestCredentials;
}

export default function fetchAdapter(config: AxiosFetchRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const request = createRequest(config, signal);
    const promises = [getResponse(request, config)];

    if (config.timeout && config.timeout > 0) {
      promises.push(timeoutHandle(request, controller, config));
    }
    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel ? new CanceledError(null, config, request) : cancel);
        controller.abort();
      });
    }
    return Promise.race(promises)
      .then((data) => settle(resolve, reject, data))
      .catch(reject);
  });
}

function timeoutHandle(request: Request, controller: AbortController, config: AxiosFetchRequestConfig): Promise<Error> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const message = config.timeoutErrorMessage ? config.timeoutErrorMessage : 'timeout of ' + config.timeout + 'ms exceeded';
      resolve(createError(message, config, 'ECONNABORTED', request));
      controller.abort();
    }, config.timeout);
  });
}

async function getResponse(request: Request, config: AxiosFetchRequestConfig) {
  let stageOne;
  try {
    stageOne = await fetch(request);
  } catch (e) {
    return createError('Network Error', config, 'ERR_NETWORK', request);
  }

  const response = {
    ok: stageOne.ok,
    status: stageOne.status,
    statusText: stageOne.statusText,
    headers: new Headers(stageOne.headers),
    config: config,
    request,
  } as unknown as AxiosResponse<any, any>;

  if (stageOne.status >= 200 && stageOne.status !== 204) {
    switch (config.responseType) {
      case 'arraybuffer':
        response.data = await stageOne.arrayBuffer();
        break;
      case 'blob':
        response.data = await stageOne.blob();
        break;
      case 'json':
        response.data = await stageOne.json();
        break;
      default:
        response.data = await stageOne.text();
        break;
    }
  }

  return response;
}

function createRequest(config: AxiosFetchRequestConfig, signal: AbortSignal): Request {
  const headers = new Headers(config.headers as any as Headers);

  if (config.auth) {
    const username = config.auth.username || '';
    const password = config.auth.password ? decodeURI(encodeURIComponent(config.auth.password)) : '';
    headers.set('Authorization', `Basic ${btoa(username + ':' + password)}`);
  }

  const method = config.method.toUpperCase();
  const options: RequestInit = { headers, method, signal };
  if (method !== 'GET' && method !== 'HEAD') {
    options.body = config.data;
  }
  if (config.mode) {
    options.mode = config.mode;
  }
  if (config.cache) {
    options.cache = config.cache;
  }
  if (config.integrity) {
    options.integrity = config.integrity;
  }
  if (config.redirect) {
    options.redirect = config.redirect;
  }
  if (config.referrer) {
    options.referrer = config.referrer;
  }

  if (!isUndefined(config.withCredentials)) {
    options.credentials = config.withCredentials ? 'include' : 'omit';
  }

  const fullPath = buildFullPath(config.baseURL, config.url);
  const url = buildURL(fullPath, config.params, config.paramsSerializer);

  // Expected browser to throw error if there is any wrong configuration value
  return new Request(url, options);
}

function createError(message: string, config: AxiosFetchRequestConfig, code: string, request: Request, response?: AxiosResponse): Error {
  return new AxiosError(message, AxiosError[code], config, request, response);
}
