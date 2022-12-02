import React, { useState } from 'react';
import { Input as AntdInput, InputProps } from 'antd';
import IconFont from '../IconFont';
import { useDebounce, useUpdateEffect } from 'ahooks';
import './index.less';

interface IInputProps extends Omit<InputProps, 'onChange'> {
  defaultValue?: string;
  value?: string;
  className?: string;
  onEnter?: (val: string) => void;
  onChange?: (val: string) => void;
}

function Input({ prefix, className, suffix, allowClear, defaultValue, value, onChange, onEnter, ...props }: IInputProps) {
  const [state, setState] = useState({ value: defaultValue || value, focus: false });
  const debouncedValue = useDebounce(state.value, { wait: 500 });
  useUpdateEffect(() => onChange?.(debouncedValue), [debouncedValue]);

  return (
    <AntdInput
      {...props}
      className={`bc-search-input ${className}`}
      onChange={(e) => setState((old) => ({ ...old, value: e.target.value }))}
      allowClear={allowClear}
      prefix={prefix}
      suffix={suffix}
      value={state.value}
      onPressEnter={() => onEnter?.(state.value)}
    />
  );
}
Input.defaultProps = { className: '', prefix: <IconFont type="lm-player_Edit_Search" />, allowClear: true };

export default Input;
