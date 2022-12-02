export default {
  target: 'browser',
  esm: 'babel',
  pkgs: [
    // 组件依赖构建顺序， 例如 a组件依赖于b组件，那么需要先编译 b,在编译a,则 这里可以控制组件编译顺序
  ],
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', style: true }, 'antd'],
    ['import', { libraryName: '@cloud-app-dev/basic-components', style: false, camel2DashComponentName: false, libraryDirectory: 'es' }, 'basic-components'],
    ['import', { libraryName: '@cloud-app-dev/utils', style: false, camel2DashComponentName: false, libraryDirectory: 'es' }, 'utils'],
    ['import', { libraryName: 'ahooks', style: false, camel2DashComponentName: false, libraryDirectory: 'es' }, 'ahooks'],
    ['import', { libraryName: '@cloud-app-dev/map', style: false, camel2DashComponentName: false, libraryDirectory: 'es' }, 'map-components'],
  ],
  lessInRollupMode: {
    modifyVars: {
      '@ant-prefix': 'cloudapp',
    },
  },
  lessInBabelMode: {
    // babel 模式下做 less 编译
    modifyVars: {
      '@ant-prefix': 'cloudapp',
    },
  },
};
