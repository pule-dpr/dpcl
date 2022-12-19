---
title: 全屏 FullScreen
nav:
  path: /components
  title: 组件库
  order: 2
group:
  path: /layout
  title: 布局
  order: 1
---

## FullScreen 全屏组件

基于`ahook useFullScreen`。

#### 代码演示

```tsx
import React, { useRef } from 'react';
import FullScreen from './index';

const App = () => {
  const ref = useRef();
  return (
    <div ref={ref}>
      <FullScreen getContainer={() => ref.current} hasText={true} />
    </div>
  );
};
export default App;
```

<API src="./index.tsx"></API>
