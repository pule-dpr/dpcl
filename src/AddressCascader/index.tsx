import React from 'react';
import { Cascader as AntCascader, CascaderProps } from 'antd';
import { Address, AddressGItem } from './address';
interface MCascaderProps extends Omit<CascaderProps<AddressGItem>, 'options' | 'fieldNames' | 'onChange'> {
  value?: string[];
  className?: string;
  onChange?: (val: string[] | unknown) => void;
  multiple?: boolean;
}
const AddressCascader = ({ className, multiple, onChange, ...props }: MCascaderProps) => {
  return (
    <AntCascader
      multiple={multiple}
      onChange={onChange}
      className={`${className}`}
      {...props}
      options={Address}
      fieldNames={{ label: 'name', value: 'code' }}
    />
  );
};
AddressCascader.defaultProps = { className: '', multiple: false };
export default AddressCascader;
