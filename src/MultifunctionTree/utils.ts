import { uniq } from 'lodash-es';
import { ITreeItem } from './index.d';

export function getTreeIdWithKeyword(treeMap: { [key: string]: ITreeItem }, keyword: string) {
  const arr = [] as string[];
  if (keyword === '') {
    return arr;
  }
  const getParentCode = (code: string, arr2 = [] as string[]) => {
    if (treeMap[code]) {
      const item2 = treeMap[code];
      arr2.push(code);
      if (item2.parentId && treeMap[item2.parentId]) {
        getParentCode(item2.parentId,arr2);
      }
    }
    return arr2;
  };
  const data = Object.values(treeMap);
  data.forEach((item: ITreeItem) => {
    if (item.groupName.indexOf(keyword) !== -1) {
      arr.push(...getParentCode(item.id));
    }
  });

  return uniq(arr);
}

export function getTreeMap(treeData: ITreeItem[]) {
  const map = {} as any;
  treeData.forEach((item: ITreeItem) => {
    map[item.id] = item;
  });
  return map;
}


