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


  initializing() {
    // console.log(`初始化阶段`)
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
  }

  install() {
    this.yarnInstall()
  }

}

module.exports = wxprogram