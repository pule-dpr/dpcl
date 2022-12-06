import React from 'react';
import IconFont from '../IconFont';
import Input from '../Input';
import { useSafeState } from 'ahooks';
import MultifunctionTree from './index';
import { OrderItem, UpdateParams } from '../MultifunctionTree/index.d';

const App = () => {
  const [keyword, steKeyword] = useSafeState<string>('');
  const treeList = [
    {
      id: '10001002',
      systemId: 100100000002,
      groupName: '66999f',
      parentId: '100010001000',
      totalCount: 0,
      onlineCount: 0,
      orderNo: 0,
      level: 1,
      createdBy: 'admin',
      createdTime: 1668046296090,
      updatedBy: 'admin',
      updatedTime: 1668046296090,
    },
    {
      id: '1000',
      systemId: 100100000002,
      groupName: '自定义分组',
      totalCount: 30,
      onlineCount: 16,
      orderNo: 0,
      level: 0,
      createdBy: 'admin',
      createdTime: 1666679768634,
      updatedBy: 'admin',
      updatedTime: 1666679768634,
    },
    {
      id: '100010001000',
      systemId: 100100000002,
      groupName: '+++++',
      parentId: '1000',
      totalCount: 10,
      onlineCount: 4,
      orderNo: 0,
      level: 2,
      createdBy: 'admin',
      createdTime: 1668046279092,
      updatedBy: 'admin',
      updatedTime: 1668046279092,
    },
    {
      id: '10001001',
      systemId: 100100000002,
      groupName: 'dsafsfsf',
      parentId: '1000',
      totalCount: 10,
      onlineCount: 4,
      orderNo: 1,
      level: 2,
      createdBy: 'admin',
      createdTime: 1668073578448,
      updatedBy: 'admin',
      updatedTime: 1668073578448,
    },
    {
      id: '-1',
      groupName: '未分组',
      totalCount: 209,
      onlineCount: 116,
    },
  ];
  /**
   *
   * @param selectedId 当前选中分组id
   */
  const selectedChange = (selectedId: string) => {
    console.log(selectedId, 'selectedId');
  };
  /**
   *
   * @param orderList 拖拽结束后当前位置的所有同级排序后的List
   * @param id 当前拖拽分组的id
   * @param parentId 拖拽结束后当前位置的父id
   */
  const updateNode = (orderList: OrderItem[], id?: string, parentId?: string) => {
    console.log(orderList, id, parentId, 'orderList,id,parentId //将当前分组父节点设为parentId后传入orderList调排序接口');
  };
  /**
   *
   * @param item 编辑后的分组对象
   */
  const update = (item: UpdateParams) => {
    console.log(item, 'item');
  };
  /**
   *
   * @param item 新增分组对象
   * @param orderList 排序后的List
   */
  const add = (item: UpdateParams, orderList: OrderItem[]) => {
    console.log(item, orderList, 'item,orderList');
  };
  /**
   *
   * @param ids 需要删除的分组id集合
   */
  const deleteGroup = (ids: string[]) => {
    console.log(ids, 'ids');
  };
  return (
    <div className="user-org">
      <Input
        placeholder="输入目录名称"
        bordered={false}
        autoFocus
        allowClear={false}
        style={{ paddingLeft: '18px' }}
        onChange={(v) => steKeyword(v)}
        prefix={<IconFont type="icon-renwupeizhi_shebeirenwu_sousuo" style={{ position: 'absolute', left: '4px', zIndex: '2' }} />}
      />
      <MultifunctionTree
        switcherIcon={<IconFont type="icon-renwupeizhi_shebeirenwu_shouqi-copy" style={{ transform: 'rotate(90deg)' }} />}
        treeList={treeList}
        keyword={keyword}
        fieldNames={{ title: 'name', key: 'id' }}
        selectedChange={selectedChange}
        expandedAll={false}
        deleteFun={deleteGroup}
        move={updateNode}
        update={update}
        add={add}
      />
    </div>
  );
};

export default App;
