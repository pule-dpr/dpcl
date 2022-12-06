import React from 'react';
import AntCascader from './index'
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider prefixCls="cloudapp">
      <AntCascader placeholder="请选择行政区划"/>
    </ConfigProvider>
  );
}

export default App;
