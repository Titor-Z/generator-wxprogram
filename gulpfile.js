const { src, parallel, dest, watch, series } = require("gulp")
const stylus = require("gulp-stylus")
const YAML = require("yaml")
const fs = require("fs")
const rename = require("gulp-rename")
const csso = require("gulp-csso")

// Gulp工程配置文件：*.yml
const yamlFile = `./gulp.yml`

let projectConfig
try {
  projectConfig = YAML.parse(fs.readFileSync(yamlFile, "utf8"))
} catch (error) {
  console.log(`工程配置文件读取错误，请查看 ${configFile} 是否存在`)
  return console.error(error)
}

// 源代码文件: 二维数组
const source = projectConfig.css.source
// 目标文件: 数组
const object = projectConfig.css.object
// 目标文件后缀名为null设置
let buildExtname = projectConfig.css.build.extname == null ? '.css' : projectConfig.css.build.extname
// 目标文件压缩后缀名为null设置
let minExtname = projectConfig.css.min.extname == null ? '.min.css' : projectConfig.css.min.extname

/****************************************************************
* CSS
****************************************************************/

/* CSS 构建：
** 可根据配置项，动态的编译多个绑定好的目录和文件
********************************/
async function css() {
  for (let number = 0; number < source.length; number++) {
    await cssBuilder(number)
      .pipe(rename({ extname: buildExtname }))
      .pipe(dest(object[index]))
  }
}

/* CSS 构建器：
** 根据传入的索引值，和配置文件进行匹配，动态的编译多个绑定好的目录和文件
********************************/
function cssBuilder(index) {
  return src(source[index], { allowEmpty: true })
    .pipe(stylus())
}

/* CSS 压缩
** 与CSS构建类似，增加了css压缩功能
********************************/
function cssMini() {
  for (let number = 0; number < source.length; number++) {
    await cssBuilder(number)
      .pipe(csso())
      .pipe(rename({ extname: minExtname }))
      .pipe(dest(object[index]))
  }
}

/****************************************************************
* 自动化
****************************************************************/
let autoGlobs = projectConfig.autoBuild[0] == null ? '' : projectConfig.autoBuild
watch(autoGlobs, series(css))

/****************************************************************
* Gulp Commands
****************************************************************/
exports.default = parallel(css)
exports.min = parallel(cssMini)