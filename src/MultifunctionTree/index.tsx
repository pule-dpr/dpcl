import React from 'react';
import { Tree, TreeProps } from 'antd';
import { OrderItem, UpdateParams } from './index.d';
import '../../iconfont.js';
import './index.less';
import useTreeHandle from './useTreeHandle';

export interface MultifunctionTreeType extends Omit<TreeProps, 'treeData'> {
  /**
   * @description 树平级列表
   */
  treeList: any[];
  /**
   * @description 控制全部展开，收起
   */
  expandedAll?: boolean;
  /**
   * @description 关键字，符合的会高亮显示
   */
  keyword?: string;
  /**
   * @description 自定义移动函数，拖拽后触发
   */
  move: (orderList: OrderItem[], id?: string, parentId?: string) => void;
  /**
   * @description 自定义重命名函数，点击重命名后回车确认时触发
   */
  update: (item: UpdateParams) => void;
  /**
   * @description 自定义添加函数，点击添加后回车确认时触发
   */
  add: (item: UpdateParams, orderList: OrderItem[]) => void;
  /**
   * @description 自定义删除函数，点击删除触发
   */
  deleteFun: (ids: string[]) => void;
  /**
   * @description 选中分组改变时触发
   */
  selectedChange: (v: string) => void;
}
const MultifunctionTree = ({
  className,
  treeList,
  expandedAll,
  keyword = '',
  move,
  update,
  deleteFun,
  add,
  selectedChange,
  ...props
}: MultifunctionTreeType) => {
  const { treeData, onDrop, onExpand, expandedKeys, selectedKey } = useTreeHandle(treeList, {
    keyword,
    expandedAll,
    add,
    update,
    deleteFun,
    move,
    selectedChange,
  });
  return (
    <Tree
      className={`multifunction-tree ${className}`}
      {...props}
      treeData={treeData}
      onExpand={onExpand}
      selectedKeys={[selectedKey]}
      draggable
      onDrop={onDrop}
      expandedKeys={expandedKeys}
    />
  );
};

export default MultifunctionTree;
