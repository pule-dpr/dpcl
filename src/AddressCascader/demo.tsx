import React from 'react';
import AntCascader from './index'
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider prefixCls="cloudapp">
      <AntCascader/>
    </ConfigProvider>
  );
}

export default App;
