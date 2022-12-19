---
title: useFullscreen
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

- 基于 Javascript 的第三方库 screenfull，用于实现各种定制场景，比如闲置状态显示、插件模式等

## 代码演示 Live

<code src="./demo.tsx"></code>

### Params

| 参数    | 说明                                                        | 类型                                          | 默认值 |
| ------- | ----------------------------------------------------------- | --------------------------------------------- | ------ |
| target  | 目标元素(必填)                                              | `ref`                                         | -      |
| Options | 自定义回调函数，onEnter：进入时的回调，onExit：退出时的回调 | `{onExit?: () => void;onEnter?: () => void;}` | -      |

### Result

| 参数             | 说明           | 类型         |
| ---------------- | -------------- | ------------ |
| isEnabled        | 全屏的状态值   | `boolean`    |
| toggleFullscreen | 切换 isEnabled | `() => void` |
| enterFullscreen  | 进入全屏       | `() => void` |
| exitFullscreen   | 退出全屏       | `() => void` |

### API

```typescript
const [isEnabled, {toggleFullscreen，enterFullscreen，exitFullscreen}] = useFullscreen(ref1);
```

<API src="./index.tsx"></API>
