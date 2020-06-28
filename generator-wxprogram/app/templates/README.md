# 小葱CLI说明文档

小葱CLI —— 微信小程序开发脚手架，遵从MIT开源协议。
快速构建小程序开发环境，内置 Gulp、Stylus前端开发
所需工具。

---

## 项目目录
```
miniprogram/    ~~~ 小程序目录
tasks/          ~~~ gulp任务目录
|-- css.js      ~~~ stylus编译任务
|-- project.js  ~~~ gulp配置文件任务
.gitignore      ~~~ git初始忽略项
gulp.yml        ~~~ gulp任务配置文件
gulpfile.js     ~~~ gulp任务入口
package.json    ~~~ Package配置文件
project.config.json ~~~ 小程序项目配置文件
README.md       ~~~ 说明文件
```

---

## 使用说明
### 1. 命令行：
命令行切换到项目根目录，使用 `gulp css` 或 `gulp` 
可编译项目下所有的 stylus 文件

### 2. 集成至小程序开发工具
在小程序开发工具中，启用自定义命令，则可以在每次预览
小程式时，自动编译 Stylus 文件

---

## 开发建议
### Gulp.yml 文件
Gulp任务配置文件，默认已经包含了stylus 文件编译为wxss文件的配置。如无特殊需求，无需更改任务配置。

Gulp Stylus 默认会识别每一级目录下的 `.styl`文件并在同级目录下编译为 `.wxss`文件。

⚠️ 开发建议：在.wxss文件的同级目录下放置同名的.styl文件