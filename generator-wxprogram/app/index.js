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
    // this.copy()
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
  copy() {
    // this.fs.copy(
    //   this.templatePath('package.json'),
    //   this.destinationPath('package.json')
    // )
  }


  install() {
    // this.yarnInstall()
  }

}


module.exports = wxprogram