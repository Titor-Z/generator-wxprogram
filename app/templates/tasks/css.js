const { src, dest } = require("gulp")
const stylus = require("gulp-stylus")
const rename = require("gulp-rename")
const { projectConfig } = require("./project")


// 源代码文件: 二维数组
const source = projectConfig.css.source

// 目标文件: 数组
const object = projectConfig.css.object

// 目标文件后缀名为null设置
let buildExtname = projectConfig.css.build.extname == null ? '.css' : projectConfig.css.build.extname


/* CSS 构建：
** 可根据配置项，动态的编译多个绑定好的目录和文件
********************************/
async function css() {
  for (let number = 0; number < source.length; number++) {
    await cssBuilder(number)
  }
}

/* CSS 构建器：
** 根据传入的索引值，和配置文件进行匹配，动态的编译多个绑定好的目录和文件
********************************/
function cssBuilder(index) {
  return src(source[index], { allowEmpty: true })
    .pipe(stylus())
    .pipe(rename({ extname: buildExtname }))
    .pipe(dest(object[index]))
}


// 导出：
module.exports = {
  css
}