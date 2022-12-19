---
title: useSimpleState
nav:
  path: /components
  title: 组件库
  order: 2
group:
  path: /hooks
  title: Hooks
  order: 1
---

## useFullscreen

- 基于第三方库 ahooks，简易的 useState,更新对象单个属性直接使用 updateState({key:value})

## 代码演示 Live

<code src="./demo.tsx"></code>

### API

```typescript
const [state, updateState, setState] = useSimpleState(value);
```
