const YAML = require("yaml")
const fs = require("fs")


// Gulp工程配置文件：*.yml：文件地址要相对应gulp实际命令操作目录来写
const yamlFile = `./gulp.yml`
let projectConfig

try {
  projectConfig = YAML.parse(fs.readFileSync(yamlFile, "utf8"))
} catch (error) {
  console.log(`工程配置文件读取错误，请查看 ${yamlFile} 是否存在`)
  return console.error(error)
}


// 导出: 项目配置对象
module.exports = {
  projectConfig
}