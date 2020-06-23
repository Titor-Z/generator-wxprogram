const Generator = require("yeoman-generator")

class wxprogram extends Generator {
  constructor(params, opts) {
    console.log(`构造阶段`)
    super(params, opts)
  }

  initializing() {
    console.log(`初始化阶段`)
  }

  prompting() {
    console.log(`交互阶段`)
    const done = this.async()

    const opts = [
      {
        type: 'confirm',
        name: ''
      }
    ]
  }

  writing() {
    console.log(`写入阶段`)
  }
}

module.exports = wxprogram