import React from 'react';
import useSimpleState from '../useSimpleState';
import IconFont from '../IconFont';
import { useMemoizedFn } from 'ahooks';
import { Popover, Input } from 'antd';
import treeHelper from '../treeHelper';
import { TreeItem, TreeHandleProps, OrderParamsType, OrderItem,TreeStateType } from './index.d';
import { cloneDeep, sortBy } from 'lodash-es';
import { getTreeIdWithKeyword, getTreeMap } from './utils';
import { useEffect, useMemo } from 'react';
function useTreeHandle(treeList: TreeItem[], { keyword, selectedChange, add, update, move, deleteFun, expandedAll }: TreeHandleProps) {
  const [state, updateState] = useSimpleState<TreeStateType>({
    currentItem: {},
    preAddItem: { groupName: '', parentId: '' },
    expandedKeys: [],
    selectedKey: '',
    keyword: '',
  });
  const treeMap = useMemo(() => getTreeMap(treeList), [treeList]);
  useEffect(() => {
    const codes = getTreeIdWithKeyword(treeMap, keyword);
    updateState({ keyword: keyword, expandedKeys: codes });
  }, [keyword]);
  useEffect(() => {
    selectedChange(state.selectedKey);
  }, [state.selectedKey]);
  //全部展开收起
  useEffect(() => {
    let expandedKeys: any = [];
    if (!expandedAll) {
      updateState({ expandedKeys: [] });
    } else {
      expandedKeys = treeList?.map((item: any) => item.id);
      updateState({ expandedKeys });
    }
  }, [expandedAll]);
  const getAllSameByParentId = useMemoizedFn((parentId: string) => treeList.filter((v) => v.parentId === parentId));
  const handlesOrderList = ({ dropParentKey, dropPosition, dragKey, dropKey }: OrderParamsType): OrderItem[] => {
    //dragNode是否与node为同父级
    const allData = sortBy(getAllSameByParentId(dropParentKey), 'orderNo');
    const dragKeyIndex = allData.findIndex((v) => v.id === dragKey);
    const DropKeyIndex = allData.findIndex((v) => v.id === dropKey);

    if (dropPosition === 0) {
      if (dragKeyIndex !== -1) {
        //插入到指定位置
        allData.splice(dragKeyIndex, 1);
        allData.unshift({ id: dragKey });
      } else {
        allData.unshift({ id: dragKey });
      }
    } else {
      if (dragKeyIndex !== -1) {
        allData.splice(DropKeyIndex + dropPosition, 0, { id: dragKey });
        allData.splice(dragKeyIndex + dropPosition, 1);
      } else {
        allData.splice(DropKeyIndex + dropPosition, 0, { id: dragKey });
      }
    }
    //找所有同级的
    return allData.map((v, index) => ({ id: v.id, orderNo: index }));
  };
  const addGroupEnter = (name: string) => {
    const orderList = handlesOrderList({
      dropParentKey: state.preAddItem.parentId,
      dropPosition: 0,
      dragKey: '',
      dropKey: state.preAddItem.parentId,
    });
    add({ parentId: state.preAddItem.parentId, groupName: name }, orderList);
    updateState({ preAddItem: {} });
  };
  const updateNameEnter = (name: string) => {
    if (name === state.currentItem.groupName) {
      updateState({ currentItem: { ...state.currentItem, edit: false } });
    } else {
      updateState({ currentItem: { ...state.currentItem, edit: false } });
      update({ id: state.currentItem.id, groupName: name });
    }
  };
  const deleteGroupEnter = (id: string, name: string) => {
    const ids = getAllSameByParentId(id).map((v) => v.id);
    deleteFun([...ids, id]);
  };
  const onDrop = (info: any) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropParentKey = info.node?.parentId;
    const dragParentKey = info.dragNode?.parentId;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    //dragNode是否与node为同级
    if (info.dropToGap) {
      const orderList = handlesOrderList({ dropParentKey, dropPosition, dragKey, dropKey });
      if (dragParentKey === dropParentKey) {
        //重新排序
        move(orderList);
      } else {
        // 改dragNode父级节点改为node同父级,//找所有同级的，再排序
        move(orderList, dragKey, dropParentKey);
      }
    } else {
      //改dragNode父级节点为node,找所有同级的，再排序
      const orderList = handlesOrderList({ dropParentKey: dropKey, dropPosition, dragKey, dropKey });
      move(orderList, dragKey, dropKey);
    }
  };
  const treeDataTemp: any = useMemo(() => treeHelper.computTreeList(treeList), [treeList]);
  const MoreMenu = (node: any) => {
    return (
      <div className="handles">
        <p
          className="hbtn"
          onClick={() => {
            updateState({ currentItem: { id: node.id, edit: true, groupName: node.groupName } });
          }}
        >
          <IconFont type="icon-xitongguanli_zhongmingming" /> 重命名
        </p>
        {node.id !== '1000' && (
          <p
            className="hbtn"
            onClick={() => {
              deleteGroupEnter(node.id, node.groupName);
            }}
          >
            <IconFont type="icon-renwupeizhi_shebeirenwu_qingkong" /> 删除
          </p>
        )}
      </div>
    );
  };
  // 树数据处理，高亮关键字
  const treeData = useMemo(() => {
    const loop = (data: any[]): any[] =>
      data.map((item: any) => {
        const strName = item.groupName || ('' as string);
        const index = strName.indexOf(state.keyword);
        const beforeStr = strName.substring(0, index);
        const afterStr = strName.slice(index + state.keyword.length);
        const isEdit = item.id === state.currentItem.id ? state.currentItem.edit : false;
        //当前节点是否为新增父节点新增
        const addFlag = item.id === state.preAddItem.parentId;
        //当前节点是否为新增父节点新增
        const currentAdd = item.id === 'preId';
        let EditGroupName = state.currentItem.groupName;
        const name =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{state.keyword}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strName}</span>
          );
        let title = isEdit ? (
          <div className="searchinput">
            <Input
              placeholder="请输入重命名名称"
              allowClear={false}
              autoFocus
              defaultValue={EditGroupName}
              style={{ fontSize: 'var(--fs-small)' }}
              onPressEnter={(e: any) => {
                updateNameEnter(e.target.value);
              }}
              prefix={<IconFont type="icon-renwupeizhi_shebeirenwu_sousuo" style={{ fontSize: '12px' }} />}
              suffix={
                <IconFont
                  type="icon-renwupeizhi_shebeirenwu_sousuoguanbi"
                  onClick={() => {
                    updateState({ currentItem: { id: item.id, edit: false } });
                  }}
                />
              }
            />
          </div>
        ) : (
          <div className="tree-item">
            <div
              className="item-info"
              onClick={() => {
                updateState({ selectedKey: item.id === state.selectedKey ? '' : item.id });
              }}
            >
              {name}
            </div>
            {strName !== '未分组' && (
              <div className="item-tool">
                <Popover content={MoreMenu(item)} placement="bottomLeft">
                  <IconFont type="icon-xitongguanli_gengduo" />
                </Popover>
                <IconFont
                  type="icon-xitongguanli_zengjiafenzu"
                  onClick={() => {
                    updateState({ preAddItem: { id: 'preId', groupName: '', parentId: item?.id } });
                  }}
                />
              </div>
            )}
          </div>
        );
        if (currentAdd) {
          title = (
            <div className="searchinput">
              <Input
                placeholder="请输入新增分组名称"
                allowClear={false}
                autoFocus
                style={{ fontSize: 'var(--fs-small)' }}
                onPressEnter={(e: any) => {
                  addGroupEnter(e.target.value);
                }}
                prefix={<IconFont type="icon-renwupeizhi_shebeirenwu_sousuo" style={{ fontSize: '12px' }} />}
                suffix={
                  <IconFont
                    type="icon-renwupeizhi_shebeirenwu_sousuoguanbi"
                    onClick={() => {
                      updateState({ preAddItem: {} });
                    }}
                  />
                }
              />
            </div>
          );
        }
        const newChildren: any[] = cloneDeep(item.children) || [];
        if (addFlag) {
          updateState({ expandedKeys: [...state.expandedKeys, item.id] });
          newChildren.unshift(state.preAddItem);
        }
        if (newChildren.length !== 0) {
          return { ...item, name: title, code: item.code, children: loop(newChildren) };
        }
        return { ...item, name: title, code: item.code };
      });
    const data = loop(treeDataTemp);
    return data;
  }, [state.keyword, treeDataTemp, state.currentItem, state.preAddItem, state.selectedKey]);
  const onExpand = (expandedKeys: any) => {
    updateState({ expandedKeys });
  };
  return { treeData, onExpand, expandedKeys: state.expandedKeys, selectedKey: state.selectedKey, onDrop };
}

export default useTreeHandle;
