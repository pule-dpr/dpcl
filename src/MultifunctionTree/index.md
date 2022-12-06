---
title: 拖拽自定义增删改查树 MultifunctionTree
nav:
  path: /components
  title: 组件库
  order: 2
group:
  path: /widget
  title: 控件
  order: 1
---

## MultifunctionTree 拖拽自定义增删改查树

支持拖拽，自定义新增，编辑，删除,关键字筛选。

### 何时使用

拓展性不强

### 代码演示

```tsx
import React from 'react';
import Demo from './demo';
import { ConfigProvider } from 'antd';

const App = () => {
  return (
    <ConfigProvider prefixCls="cloudapp">
      <Demo />
    </ConfigProvider>
  );
};
export default App;
```

### 参数
<API src="./index.tsx" />
