import { defineConfig } from 'dumi';
import path from 'path';
import { themeConfig } from './theme-config';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb25JZCI6IjEwMDEwMTAwMDQ0NSIsImV4dCI6MTY2NTc0ODU1OTg5MSwidWlkIjoiMTAxMDAwMDAwNjk5IiwidmFsaWRTdGF0ZSI6MTA0NDA2LCJyb2xlSWQiOlsxMDAwMDAxMTA1MTgsMTAwMDAwMTEwNzI4XSwidmFsaWRUaW1lIjoxNzA0MzgzOTk5MDAwLCJvcHRDZW50ZXJJZCI6IjEwMDEwMDAwMDIzMyIsInVzZXJUeXBlIjoxMDA3MDQsImlhdCI6MTY2NTQ4OTM1OTg5MX0.zxxxxoaKjyO6CJhi2cs06gTOtjdLgPA9UI7zAQ0zzss';

export default defineConfig({
  title: 'CloudApp VIDC',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  targets: { chrome: 60 },
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', style: true }, 'antd'],
    ['import', { libraryName: '@cloud-app-dev/utils', style: false, camel2DashComponentName: false, libraryDirectory: 'es' }, 'utils'],
    ['import', { libraryName: 'ahooks', style: false, camel2DashComponentName: false, libraryDirectory: 'es' }, 'ahooks'],
    ['import', { libraryName: '@cloud-app-dev/map', style: false, camel2DashComponentName: false, libraryDirectory: 'es' }, 'map-components'],
  ],
  theme: {
    '@ant-prefix': 'cloudapp',
  },
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitLab',
      path: 'https://git.topvdn.com/cloudapp/vidc',
    },
  ],
  alias: {
    '@src': path.resolve('./src'),
  },
  proxy: {
    '/api': {
      target: 'https://jxsr-eye.antelopecloud.cn/',
      changeOrigin: true,
    },
  },
  mfsu:
    process.env.NODE_ENV === 'development'
      ? {
          development: {
            output: './.mfsu/dev',
          },
          production: {
            output: './.mfsu/prod',
          },
        }
      : undefined,
  scripts: ['//at.alicdn.com/t/font_1724012_972m5d05cou.js'],
  styles: [themeConfig],

  // more config: https://d.umijs.org/config
});
