# 小葱CLI说明文档
小葱CLI —— 是一款开源的**微信小程序开发脚手架工具**，源码遵从 MIT 开源协议。为小程序提供了 Stylus CSS 预处理语言支持，内置Gulp 前端工具。推荐使用 Yarn 作为默认 Package 包管理工具。


## 使用方法
☠ 使用前建议使用**yarn**作为你的前端默认Package包管理工具。

---

### 一、安装 (Install)
#### ① 全局安装 **yeoman**

```sh
yarn global add yo
```
或
``` sh
npm install -g yo
```


#### ② 全局安装 小葱CLI

``` sh
yarn global add generator-wxprogram
```
或
``` sh
npm install -g generator-wxprogram
```

---

### 二、使用

``` sh
yo wxprogram <Project Name(项目名称)>
```
#### 命令行参数说明
- **Project Name（项目名称）**: 项目目录 **（必填项）**<br>
  如果你用过 **Vue Cli**，那么是一样的，都会创建你输入的项目目录。

- **AppID** : 小程序开发AppID <br>
  小程序开发AppID，开发前请前往微信平台获取

<br>

---

<br>

## 源码目录结构
```
generator-wxprogram
|-- app
|---- templates   ~~~ 模版文件夹
|---- index.js    ~~~ yeoman主文件
|-- package.json  ~~~ 脚手架配置
|-- yarn.lock
|-- README.md
.gitignore
```

- [Github](https://github.com/Titor-Z/stylus-boot)
- [NPM](https://www.npmjs.com/package/generator-wxprogram)