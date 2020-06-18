const generators = require('yeoman-generator')
const _ = require('yeoman-generator/node_modules/lodash')
const glob = require('yeoman-generator/node_modules/glob')
const chalk = require('yeoman-generator/node_modules/chalk')

const fs = require('fs')
const path = require('path')
const del = require('del')
const generatorName = 'wxprogram'




module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments)
  },
  prompting: function () {

  },
  writing: {

  },
  end: {

  }
})