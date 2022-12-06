export interface TreeStateType {
  currentItem: TreeItem;
  preAddItem: UpdateParams;
  expandedKeys: string[];
  selectedKey: string;
  keyword: string;
}
export interface UpdateParams {
  id?: string;
  groupName?: string;
  userId?: string;
  parentId?: string;
}

export interface TreeItem {
  id?: string;
  groupName?: string;
  parentId?: string;
  [key: string]: any;
}
export interface TreeHandleProps {
  keyword?: string;
  expandedAll?: boolean;
  move: (orderList: OrderItem[], id?: string, parentId?: string) => void;
  add: (item: UpdateParams, orderList: OrderItem[]) => void;
  update: (item: UpdateParams) => void;
  deleteFun: (ids: string[]) => void;
  selectedChange: (v: string) => void;
}
export interface OrderParamsType {
  dropParentKey: string;
  dropPosition: number;
  dragKey: string;
  dropKey: string;
}
export interface OrderItem {
  id: string | undefined;
  orderNo: number;
}
export interface ITreeItem {
  [key: string]: any;
}
