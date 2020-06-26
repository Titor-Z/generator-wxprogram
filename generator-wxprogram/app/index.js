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


  async prompting() {
    // CLI用户填写选项：
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'appId',
        message: '小程序开发AppID'
      }
    ])
  }


  writing() {
    this.log("项目名称:", this.options.appname)
    this.log("App ID:", this.answers.appId)

    // 移动模板文件
    this._copyTemplates([
      { src: 'package.json', obj: 'package.json', options: { name: this.options.appname } },
      { src: 'project.config.json', obj: 'project.config.json', options: { appId: this.answers.appId, name: this.options.appname } }
    ])

    // 移动固定文件
    this._copy([
      { src: 'gulpfile.js', obj: 'gulpfile.js' },
      { src: 'gulp.yml', obj: 'gulp.yml' },
      { src: '.gitignore', obj: '.gitignore' },
      { src: 'tasks/css.js', obj: 'tasks/css.js' },
      { src: 'tasks/project.js', obj: 'tasks/project.js' },
      { src: 'miniprogram/sitemap.json', obj: 'miniprogram/sitemap.json' },
      { src: 'miniprogram/app.styl', obj: 'miniprogram/app.styl' },
      { src: 'miniprogram/app.js', obj: 'miniprogram/app.js' },
      { src: 'miniprogram/app.json', obj: 'miniprogram/app.json' },
      { src: 'miniprogram/pages/index/index.js', obj: 'miniprogram/pages/index/index.js' },
      { src: 'miniprogram/pages/index/index.json', obj: 'miniprogram/pages/index/index.json' },
      { src: 'miniprogram/pages/index/index.styl', obj: 'miniprogram/pages/index/index.styl' },
      { src: 'miniprogram/pages/index/index.wxml', obj: 'miniprogram/pages/index/index.wxml' }
    ])
  }


  /*
   * Copy 模板文件
  ################################################ */
  _copyTemplates(files) {
    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.obj),
        file.options
      )
    })
  }


  /*
   * Copy 固定文件
  ################################################ */
  _copy(files) {
    files.forEach(file => {
      this.fs.copy(
        this.templatePath(file.src),
        this.destinationPath(file.obj)
      )
    })
  }


  install() {
    this.yarnInstall()
  }

}


module.exports = wxprogram