---
title: 输入框 Input
nav:
  path: /components
  title: 组件库
  order: 2
group:
  path: /form
  title: 表单
  order: 1
---

## Input 文本输入

主题布局容器组件。

### 何时使用

常用于盒子标题部分

### 代码演示

```tsx
import React from 'react';
import { Input } from '@cloud-app-dev/vidc';
import { ConfigProvider } from 'antd';

const App = () => {
  return (
    <ConfigProvider prefixCls="cloudapp">
      <Input onChange={console.log} />
    </ConfigProvider>
  );
};
export default App;
```

<API src="./index.tsx" />
