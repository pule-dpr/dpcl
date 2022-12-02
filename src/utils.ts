import { cache } from '@cloud-app-dev/utils';
import type { MutableRefObject } from 'react';

export const getHeader = () => ({ Authorization: cache.getCache('token', 'session') });

/**
 * @desc 根据id获取所有父级
 */
export function getParentListById(id: string, orgList = [] as any[], list = [] as any[], key = 'id', pkey = 'parentId') {
  for (let i = 0, len = orgList.length; i < len; i++) {
    let item = orgList[i];
    if (item[key] === id) {
      list.push(item);
      if (item[pkey]) {
        getParentListById(item[pkey], orgList, list, key, pkey);
      }
    }
  }
  return list;
}

/**
 * 获取场所下的所有场所codes
 * @param {string} orgId
 * @param {Array} ids = []
 */
export function getPlaceCodesWithParent(areaCode: string, list = [] as any[], areaCodes = [] as string[], key = 'areaCode', pkey = 'parentCode') {
  const info = list.find((v) => v[key] === areaCode);
  if (info?.pcodes) {
    return info.pcodes.reverse();
  }
  if (info) {
    areaCodes.push(areaCode);
    if (info[pkey] && info[pkey] * 1 !== 0) {
      getPlaceCodesWithParent(info.parentCode, areaCodes, list, key, pkey);
    }
  }
  return areaCodes;
}

export function nextTick(cb: () => void) {
  Promise.resolve().then(cb);
}

export async function tryCatch(resolveFn: () => Promise<any>, rejectFn: (e: unknown) => void = console.error) {
  try {
    await resolveFn();
  } catch (e) {
    rejectFn(e);
  }
}

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> = (() => TargetValue<T>) | TargetValue<T> | MutableRefObject<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetValue<T>;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}

const getScrollTop = (el: Document | Element) => {
  if (el === document || el === document.body) {
    return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
  }
  return (el as Element).scrollTop;
};

const getScrollHeight = (el: Document | Element) => {
  return (el as Element).scrollHeight || Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
};

const getClientHeight = (el: Document | Element) => {
  return (el as Element).clientHeight || Math.max(document.documentElement.clientHeight, document.body.clientHeight);
};

const getEleScrollHeight = (el: Document | Element) => {
  if (el === document || el === document.body) {
    return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
  }
  let top = 0;
  let dom = el as Element;
  while (dom) {
    top += dom.scrollTop;
    dom = dom.parentElement;
  }
  return top;
};

export { getScrollTop, getScrollHeight, getClientHeight, getEleScrollHeight };
