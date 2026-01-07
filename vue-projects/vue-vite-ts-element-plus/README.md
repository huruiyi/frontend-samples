# vite-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```



npm create vite@latest

> npx
> create-vite

│
◇  Project name:
│  vite-project
│
◇  Select a framework:
│  Vue
│
◇  Select a variant:
│  Official Vue Starter ↗
│
◇  Use rolldown-vite (Experimental)?:
│  No
│
◇  Install with npm and start now?
│  Yes
Need to install the following packages:
create-vue@3.18.5
Ok to proceed? (y) y


> npx
> create-vue vite-project

┌  Vue.js - The Progressive JavaScript Framework
│
◇  请选择要包含的功能： (↑/↓ 切换，空格选择，a 全选，回车确认)
│  TypeScript, JSX 支持, Router（单页面应用开发）, Pinia（状态管理）, ESLint（错误预防）, Prettier（代码格式化）
│
◇  选择要包含的试验特性： (↑/↓ 切换，空格选择，a 全选，回车确认)
│  none
│
◇  跳过所有示例代码，创建一个空白的 Vue 项目？
│  No

正在初始化项目 vite-project...
│
└  项目初始化完成，可执行以下命令：

   cd vite-project
   npm install
   npm run format
   npm run dev

| 可选：使用以下命令在项目目录中初始化 Git：

   git init && git add -A && git commit -m "initial commit"
