import { compact, cloneDeep, orderBy } from 'lodash';

function computPlaceTree<T>(list: T[], isNoDeep?: boolean) {
  let treeData;
  list = orderBy(list, ['provinceId'], ['asc']);
  if (!isNoDeep) {
    treeData = cloneDeep(list);
  } else {
    treeData = list;
  }
  let treeMap = {};

  treeData.forEach((v: any) => {
    treeMap[v.areaCode] = v;
  });

  function getPcodesPlace(codes: any[]) {
    return compact(codes.map((v) => treeMap[v]));
  }

  let arr = [] as number[];
  treeData.forEach((item: any, index) => {
    let hasParent = false;
    if (item.level >= 5 && Array.isArray(item.pcodes)) {
      const pPlaces = getPcodesPlace(item.pcodes);
      const pLevels = pPlaces.map((v) => (v ? v.level : 0));
      const item2 = pPlaces[pLevels.indexOf(Math.max.apply(null, pLevels))];
      if (item2) {
        hasParent = true;
        !Array.isArray(item2.children) && (item2.children = []);
        item2.children.push(item);
      }
    }

    if (item.level < 5) {
      if (item.parentCode && treeMap[item.parentCode]) {
        hasParent = true;
        const item2 = treeMap[item.parentCode];
        !Array.isArray(item2.children) && (item2.children = []);
        item2.children.push(item);
      }
    }

    !hasParent && arr.push(index);
  });
  treeMap = null;

  return treeData.filter((v: any, index) => arr.includes(index) && v.id !== '1200000000000000000');
}

function computPlaceTreeHasUnknown<T>(list: T[], isNoDeep?: boolean) {
  let treeData;
  list = orderBy(list, ['provinceId'], ['asc']);
  if (!isNoDeep) {
    treeData = cloneDeep(list);
  } else {
    treeData = list;
  }
  let treeMap = {};

  treeData.forEach((v: any) => {
    treeMap[v.areaCode] = v;
  });

  function getPcodesPlace(codes: any[]) {
    return compact(codes.map((v) => treeMap[v]));
  }

  let arr = [] as number[];
  treeData.forEach((item: any, index: number) => {
    let hasParent = false;
    if (item.level >= 5 && Array.isArray(item.pcodes)) {
      const pPlaces = getPcodesPlace(item.pcodes);
      const pLevels = pPlaces.map((v) => (v ? v.level : 0));
      const item2 = pPlaces[pLevels.indexOf(Math.max.apply(null, pLevels))];
      if (item2) {
        hasParent = true;
        !Array.isArray(item2.children) && (item2.children = []);
        item2.children.push(item);
      }
    }

    if (item.level < 5) {
      if (item.parentCode && treeMap[item.parentCode]) {
        hasParent = true;
        const item2 = treeMap[item.parentCode];
        !Array.isArray(item2.children) && (item2.children = []);
        item2.children.push(item);
      }
    }

    !hasParent && arr.push(index);
  });
  treeMap = null;

  return treeData.filter((v, index) => arr.includes(index));
}

function computTreeList<T>(list: T[], id = 'id', pid = 'parentId', isNoDeep?: boolean) {
  let treeData;
  if (!isNoDeep) {
    treeData = cloneDeep(list);
  } else {
    treeData = list;
  }
  let treeMap = {};

  treeData.forEach((v) => {
    treeMap[v[id]] = v;
  });

  let arr = [] as number[];
  for (let i = 0, l = treeData.length; i < l; i++) {
    const item = treeData[i];
    let hasParent = false;
    if (item[pid] && treeMap[item[pid]]) {
      hasParent = true;
      const item2 = treeMap[item[pid]];
      !Array.isArray(item2.children) && (item2.children = []);
      item2.children.push(item);
    }
    !hasParent && arr.push(i);
  }
  treeMap = null;
  return treeData.filter((_, index) => arr.includes(index));
}

export default {
  computPlaceTree,
  computTreeList,
  computPlaceTreeHasUnknown,
};
