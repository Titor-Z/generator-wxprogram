const Generator = require("yeoman-generator")


class wxprogram extends Generator {

  constructor(args, opts) {
    super(args, opts)
    this.argument("appname", {
      type: String,
      required: true,
      default: this.appname
    })
  }


  /* 交互步骤
   * Cli 下和用户进行交互的配置，可通过 this.options.[name]获取值
  ********************************************************************** */
  async prompting() {
    this.log(`若你没有小程序，可申请测试号的Appid \n(测试号申请地址: https://developers.weixin.qq.com/community/welogin?redirect_url=%2Fsandbox) \n`)
    // CLI用户填写选项：
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'appId',
        message: '🚩小程序AppID:',
        required: true
      },
      {
        type: 'list',
        name: 'dependencies',
        message: '🧩挑选你喜欢的package包管理工具:',
        choices: [
          { name: 'Yarn', value: 0, checked: true, },
          { name: 'Npm', value: 1 }
        ]
      }
    ])
  }


  /* 文件处理阶段
   * 编译模板，移动文件到项目最终的阶段下
  ********************************************************************** */
  writing() {

    // Cli 用户输入的工作目录:
    const workDir = this.options.appname + '/'

    this.log("\n--------------------- 项目详情 ---------------------")

    this.log("项目名称:", this.options.appname)
    this.log("AppID:", this.answers.appId)

    this.log("\n-------------------- 项目初始化 --------------------")

    // 移动可变模板文件:
    this._copyTemplates([
      { src: 'package.json', obj: `${workDir}package.json`, options: { name: this.options.appname } },
      { src: 'project.config.json', obj: `${workDir}project.config.json`, options: { appId: this.answers.appId, name: this.options.appname } }
    ])

    // 移动不可变文件:
    this._copy([
      { src: 'gulpfile.js', obj: `${workDir}gulpfile.js` },
      { src: 'README.md', obj: `${workDir}README.md` },
      { src: 'gulp.yml', obj: `${workDir}gulp.yml` },
      { src: '.gitignore', obj: `${workDir}.gitignore` },
      { src: 'tasks/css.js', obj: `${workDir}tasks/css.js` },
      { src: 'tasks/project.js', obj: `${workDir}tasks/project.js` },
      { src: 'miniprogram/sitemap.json', obj: `${workDir}miniprogram/sitemap.json` },
      { src: 'miniprogram/app.styl', obj: `${workDir}miniprogram/app.styl` },
      { src: 'miniprogram/app.js', obj: `${workDir}miniprogram/app.js` },
      { src: 'miniprogram/app.json', obj: `${workDir}miniprogram/app.json` },
      { src: 'miniprogram/pages/index/index.js', obj: `${workDir}miniprogram/pages/index/index.js` },
      { src: 'miniprogram/pages/index/index.json', obj: `${workDir}miniprogram/pages/index/index.json` },
      { src: 'miniprogram/pages/index/index.styl', obj: `${workDir}miniprogram/pages/index/index.styl` },
      { src: 'miniprogram/pages/index/index.wxml', obj: `${workDir}miniprogram/pages/index/index.wxml` },
      { src: 'miniprogram/pages/index/logo.svg', obj: `${workDir}miniprogram/pages/index/logo.svg` },
      { src: 'miniprogram/pages/index/footer.svg', obj: `${workDir}miniprogram/pages/index/footer.svg` },
    ])
  }


  /* COPY 可变模板文件
   * 拷贝模板目录下可变的模板文件
  ********************************************************************** */
  _copyTemplates(files) {
    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.obj),
        file.options
      )
    })
  }


  /* COPY 不可变文件
   * 拷贝模板目录下不可变的文件
  ********************************************************************** */
  _copy(files) {
    files.forEach(file => {
      this.fs.copy(
        this.templatePath(file.src),
        this.destinationPath(file.obj)
      )
    })
  }


  /* 安装步骤
   * 通过指定工作目录下的package文件，安装项目依赖包
  ********************************************************************** */
  install() {

    this.log("\n-------------------- 安装依赖 --------------------")
    // 切换到 cli 用户输入的工作目录下(将默认执行命令的目录切换到指定的子目录下):
    this.destinationRoot(this.options.appname)

    // 根据用户选择的 Package 包管理工具，使用不同的安装器:
    switch (this.answers.dependencies) {
      // 0: yarn
      case 0:
        this.yarnInstall()
        break

      // 1: npm
      case 1:
      default:
        this.npmInstall()
        break
    }
  }


  /* 初始化项目模板
   * 通过执行预设命令，初始化编译，确保项目初始文件正常生成
  ********************************************************************** */
  end() {
    this.destinationRoot(this.options.appname)
    this.spawnCommandSync("gulp")
  }


}



/* 导出生成器
 * 导出的生成器名称就是用户在CLI中使用的生成器名称。例：yo wxprogram
********************************************************************** */
module.exports = wxprogram